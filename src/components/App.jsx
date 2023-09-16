import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImagesIPA } from './Api/api';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';

function App() {
  const [imgList, setImgList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = valueFromInput => {
    setPage(1);
    setTotalPage(1);

    if (!valueFromInput) {
      toast.info('Please enter a valid value');
      setInputValue('');
      setImgList([]);
    } else {
      setInputValue(valueFromInput);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchImagesIPA(inputValue, page);

        if (response.total !== 0) {
          if (totalPage === 1) {
            const calculatedTotalPage = Math.ceil(
              response.totalHits / response.hits.length
            );
            setTotalPage(calculatedTotalPage);
          }

          setImgList(prevImgList =>
            page === 1 ? response.hits : [...prevImgList, ...response.hits]
          );
        } else {
          toast.info('Nothing found. Please try another search value.');
        }
      } catch (error) {
        console.error('Oooopss something went wrong!!!', error);
        toast.error('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (inputValue) {
      fetchData();
    }
  }, [page, inputValue, totalPage]);

  return (
    <>
      <ToastContainer autoClose={2000} theme="dark" />
      <Searchbar onSubmit={handleSubmit} />
      {imgList.length > 0 && <ImageGallery listOfImages={imgList} />}
      {loading && <Loader />}
      {totalPage > page && inputValue && (
        <LoadMore onClick={() => setPage(prev => prev + 1)} />
      )}
    </>
  );
}

export default App;

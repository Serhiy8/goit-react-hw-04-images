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

  const loaderToggle = isLoading => {
    setLoading(isLoading);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = valueFromInput => {
    if (!valueFromInput) {
      toast.info('Please enter a valid value');
      setInputValue('');
      setImgList([]);
      setPage(1);
      setTotalPage(1);
    } else {
      setInputValue(valueFromInput);
      setPage(1);
      setTotalPage(1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        loaderToggle(true);
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
        loaderToggle(false);
      }
    };

    if (inputValue) {
      fetchData();
    }
  }, [page, inputValue, totalPage]);

  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <Searchbar onSubmit={handleSubmit} />
      {imgList.length > 0 && <ImageGallery listOfImages={imgList} />}
      {loading && <Loader />}
      {totalPage > page && inputValue && <LoadMore onClick={handleLoadMore} />}
    </>
  );
}

export default App;

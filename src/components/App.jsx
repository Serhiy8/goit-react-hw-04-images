import { useState, useEffect } from 'react';
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
  const [errorMessage, setErrorMessage] = useState('');

  const loaderToggle = isLoading => {
    setLoading(isLoading);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = valueFromInput => {
    if (!valueFromInput) {
      setErrorMessage('Please enter a valid value');
      setInputValue('');
      setImgList([]);
      setPage(1);
      setTotalPage(1);
    } else {
      setInputValue(valueFromInput);
      setErrorMessage('');
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
          setErrorMessage('');
        } else {
          setErrorMessage('Nothing found. Please try a different search term.');
        }
      } catch (error) {
        console.error('Oooopss something went wrong!!!', error);
        setErrorMessage('Something went wrong. Please try again later.');
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
      <Searchbar onSubmit={handleSubmit} />
      {errorMessage && <div>{errorMessage}</div>}
      {imgList.length > 0 && <ImageGallery listOfImages={imgList} />}
      {loading && <Loader />}
      {totalPage > page && inputValue && <LoadMore onClick={handleLoadMore} />}
    </>
  );
}

export default App;

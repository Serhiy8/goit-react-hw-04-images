import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImagesIPA } from './Api/api';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    imgList: [],
    inputValue: '',
    page: 1,
    totalPage: 1,
    loading: false,
    errorMessage: '',
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.inputValue !== this.state.inputValue) {
      try {
        this.loaderToggle();
        this.setState({ imgList: [], totalPage: 1, page: 1 }, async () => {
          const response = await fetchImagesIPA(
            this.state.inputValue,
            this.state.page,
            this.loaderToggle
          );
          if (response) {
            const totalPage = Math.ceil(
              response.totalHits / response.hits.length
            );
            this.loaderToggle();
            this.setState({
              imgList: response.hits,
              totalPage: totalPage,
            });
          }
        });
      } catch (error) {
        console.log('Oooopss something went wrong!!!');
        this.loaderToggle();
      }
    }
  }

  loaderToggle = () => {
    this.setState(({ loading }) => ({
      loading: !loading,
    }));
  };

  handleSubmit = valueFromInput => {
    if (valueFromInput === '') {
      this.setState({
        errorMessage: 'Please enter a valid value',
        imgList: [],
        page: 1,
        totalPage: 1,
      });
    } else {
      this.setState({
        inputValue: valueFromInput,
        errorMessage: '',
      });
    }
  };

  handleLoadMore = async () => {
    try {
      this.loaderToggle();
      this.setState(
        prevState => ({
          page: (prevState.page += 1),
        }),
        async () => {
          const response = await fetchImagesIPA(
            this.state.inputValue,
            this.state.page
          );
          this.setState(
            prevState => ({
              imgList: [...prevState.imgList, ...response.hits],
            }),
            () => this.loaderToggle()
          );
        }
      );
    } catch (error) {
      console.log('error');
      this.loaderToggle();
    }
  };

  render() {
    const { imgList, inputValue, page, loading, totalPage, errorMessage } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {errorMessage && <div>{errorMessage}</div>}
        {imgList && inputValue && <ImageGallery listOfImages={imgList} />}
        {loading && <Loader />}
        {totalPage > page && inputValue && (
          <LoadMore onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}

export default App;

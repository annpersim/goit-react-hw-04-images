import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Blocks } from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    page: 1,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.query && this.state.query !== prevState.query) {
      this.setState({
        isLoading: true,
      });
      const responce = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...responce.hits],
        totalHits: responce.totalHits,
        page: prevState.page + 1,
        isLoading: false,
      }));
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query: query,
      images: [],
      page: 1,
    });
  };

  handleLoadClick = async () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;
    const data = await fetchImages(query, page);
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        images: [...prevState.images, ...data.hits],
        isLoading: false,
      };
    });
  };

  render() {
    const { images, isLoading, totalHits } = this.state;
    return (
      <>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />{' '}
        <ImageGallery images={images} />
        {isLoading && (
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        )}
        {totalHits > images.length && !isLoading && (
          <Button onClick={this.handleLoadClick} />
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

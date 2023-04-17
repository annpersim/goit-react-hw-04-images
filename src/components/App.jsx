import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Blocks } from 'react-loader-spinner';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  async function fetchData() {
    setIsLoading(true);
    const responce = await fetchImages(query, page);
    setImages(prevState => {
      return [...prevState, ...responce.hits];
    });
    setIsLoading(false);
    setTotalHits(responce.totalHits);
    setPage(prevState => {
      return prevState + 1;
    });
  }

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchData();
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadClick = async () => {
    fetchData();
  };

  return (
    <>
      <Searchbar handleFormSubmit={handleFormSubmit} />{' '}
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
        <Button onClick={handleLoadClick} />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
}

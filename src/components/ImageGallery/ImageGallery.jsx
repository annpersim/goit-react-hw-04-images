import { Gallery } from './ImageGallery.styled';
import { GalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => (
  <Gallery>
    {images.map(image => {
      return <GalleryItem key={image.id} image={image} />;
    })}
  </Gallery>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

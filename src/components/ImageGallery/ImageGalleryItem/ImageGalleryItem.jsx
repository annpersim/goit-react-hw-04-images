import { useState } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export function GalleryItem({ image }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Item>
      <Image alt={image.tags} src={image.webformatURL} onClick={toggleModal} />
      {modalIsOpen && (
        <ModalWindow
          alt={image.tags}
          src={image.largeImageURL}
          toggleModal={toggleModal}
        />
      )}
    </Item>
  );
}

GalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

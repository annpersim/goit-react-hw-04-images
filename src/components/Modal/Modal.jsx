import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalImage, Content } from './Modal.styled';

export function ModalWindow({ toggleModal, src, alt }) {
  useEffect(() => {
    const onModalMount = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', onModalMount);

    return () => {
      window.removeEventListener('keydown', onModalMount);
    };
  }, [toggleModal]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <Content>
        <ModalImage alt={alt} src={src} />
      </Content>
    </Overlay>,
    document.querySelector('#root')
  );
}

ModalWindow.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

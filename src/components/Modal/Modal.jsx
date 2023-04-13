import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImage, Content } from './Modal.styled';

export class ModalWindow extends Component {
  PropTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onModalOpen);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalOpen);
  }

  onModalOpen = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.onOverlayClick}>
        <Content>
          <ModalImage alt={alt} src={src} />
        </Content>
      </Overlay>,
      document.querySelector('#root')
    );
  }
}

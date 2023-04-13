import { Component } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class GalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { modalIsOpen: !prevState.modalIsOpen };
    });
  };

  PropTypes = {
    image: PropTypes.object.isRequired,
    key: PropTypes.string.isRequired,
  };

  render() {
    const { image } = this.props;
    return (
      <Item>
        <Image
          alt={image.tags}
          src={image.webformatURL}
          onClick={this.toggleModal}
        />
        {this.state.modalIsOpen && (
          <ModalWindow
            alt={image.tags}
            src={image.largeImageURL}
            toggleModal={this.toggleModal}
          />
        )}
      </Item>
    );
  }
}

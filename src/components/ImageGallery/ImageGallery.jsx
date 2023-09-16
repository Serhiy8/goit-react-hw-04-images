import { Component } from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    largeImageURL: null,
    showModal: false,
  };

  openModal = image => {
    this.setState({ largeImageURL: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null, showModal: false });
  };

  render() {
    const { listOfImages } = this.props;
    return (
      <>
        <ul className={css.ImageGallery}>
          {listOfImages.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGaleryItem
              key={id}
              webformatURL={webformatURL}
              onOpenModal={() => this.openModal(largeImageURL)}
            />
          ))}
          {this.state.showModal && (
            <Modal image={this.state.largeImageURL} onClose={this.closeModal} />
          )}
        </ul>
      </>
    );
  }
}

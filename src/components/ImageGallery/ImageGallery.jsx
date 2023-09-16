import { useState } from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ listOfImages }) => {
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = image => {
    setLargeImageURL(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL(null);
    setShowModal(false);
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {listOfImages.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGaleryItem
            key={id}
            webformatURL={webformatURL}
            onOpenModal={() => openModal(largeImageURL)}
          />
        ))}
        {showModal && <Modal image={largeImageURL} onClose={closeModal} />}
      </ul>
    </>
  );
};

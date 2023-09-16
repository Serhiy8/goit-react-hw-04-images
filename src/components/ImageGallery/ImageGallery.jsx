import { useState } from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ listOfImages }) => {
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModal = image => {
    setLargeImageURL(image || null);
    setShowModal(!showModal);
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {listOfImages.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGaleryItem
            key={id}
            webformatURL={webformatURL}
            onOpenModal={() => handleModal(largeImageURL)}
          />
        ))}
        {showModal && <Modal image={largeImageURL} onClose={handleModal} />}
      </ul>
    </>
  );
};

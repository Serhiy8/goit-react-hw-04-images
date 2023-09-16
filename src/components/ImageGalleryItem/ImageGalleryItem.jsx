import css from './ImageGalleryItem.module.css';

export const ImageGaleryItem = ({ webformatURL, onOpenModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt=""
        onClick={() => onOpenModal()}
      />
    </li>
  );
};

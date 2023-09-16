import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ image, onClose }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div>
        <img className={css.Modal} src={image} alt="" />
      </div>
    </div>
  );
};

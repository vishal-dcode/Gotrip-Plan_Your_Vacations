// ImagePreviewModal.jsx
import { useEffect, useCallback } from 'react';

const ImagePreviewModal = ({ imageUrl, onClose }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-xl" />
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-colors hover:bg-opacity-75"
          aria-label="Close preview">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;

import { motion, AnimatePresence } from 'framer-motion';
import AddPost from '../../features/posts/containers/AddPost.jsx';

export default function AddPostModal({ isOpen, onClose }) {
  // ? Framer Motion
  const modalVariants = {
    closed: {
      y: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 50
      }
    },
    open: {
      y: 0,
      transition: {
        type: '',
        stiffness: 800,
        damping: 50
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed p-5 top-0 left-0 w-full h-full overflow-auto bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="bg-white p-6 rounded-lg"
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed">
            <button
              onClick={onClose}
              className="float-right text-2xl bg-red-500 hover:bg-red-600 border border-black rounded-full p-2">
              <svg width="12" height="12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M54.1442 6.14849C55.5504 4.74229 55.5504 2.46099 54.1442 1.05469C52.738 -0.351612 50.4568 -0.351513 49.0505 1.05469L27.6014 22.5077L6.15245 1.05869C4.74625 -0.347513 2.46495 -0.347513 1.05865 1.05869C-0.34755 2.46099 -0.34755 4.74229 1.05865 6.14849L22.5076 27.5975L1.05465 49.0545C-0.35155 50.4568 -0.35155 52.7381 1.05465 54.1443C2.46085 55.5505 4.74215 55.5505 6.14445 54.1443L27.6014 32.6913L49.0545 54.1443C50.4607 55.5505 52.7419 55.5505 54.1482 54.1443C55.5545 52.7381 55.5544 50.4607 54.1482 49.0545L32.6912 27.5975L54.1442 6.14849Z"
                  fill="black"
                />
              </svg>
            </button>

            {/* //! AddPost */}
            <AddPost />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

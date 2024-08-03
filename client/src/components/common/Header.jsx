import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import logo from '../../assets/gotrip.svg';
import { authAsync, logout, selectUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuth from '../../features/auth/containers/GoogleAuth';

export default function Header() {
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      dispatch(authAsync(profile));
    }
  }, [dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    controls.start({
      position: scrolled ? 'fixed' : 'absolute',
      padding: scrolled ? '1rem 1rem' : '1.5rem 2rem'
    });
  }, [scrolled, controls]);

  const menuVariants = {
    closed: {
      x: '150%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 50
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.header
      className="top-0 left-0 right-0 transition-all ease-out z-50 bg-white border-bottom"
      animate={controls}
      initial={{ position: 'absolute', padding: '1.5rem 2rem' }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <img className="h-10 ml-1" src={logo} alt="Go Trip" />
        </Link>
        <nav className="flex justify-between items-center gap-2 font-semibold">
          {user ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border h-12 w-12 border-black rounded-full overflow-hidden object-cover text-black">
              <img src={user.result.picture || 'https://via.placeholder.com/150'} alt="Profile Pic" />
            </button>
          ) : (
            <div className="md:flex text-lg gap-2 items-center h-12 text-black">
              <GoogleAuth />
            </div>
          )}
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-28 overflow-hidden right-5 border border-black rounded-2xl w-fit bg-white shadow-lg z-50 flex flex-col items-center justify-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}>
            {user && (
              <>
                <div className="text-center p-5">
                  <p className="text-xl font-semibold">{user.result.name}</p>
                  <p className="text-sm font-normal">{user.result.email}</p>
                </div>

                <Link
                  to="/signout"
                  onClick={handleLogout}
                  className="w-full border-top px-5 py-3 bg-red-500 hover:bg-red-600 text-center font-semibold">
                  SIGNOUT
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

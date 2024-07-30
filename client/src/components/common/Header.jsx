import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import logo from '../../assets/gotrip.svg';

export default function Header() {
  const controls = useAnimation();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ? Framer Motion
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // ? Framer Motion
  useEffect(() => {
    controls.start({
      position: scrolled ? 'fixed' : 'absolute',
      padding: scrolled ? '1rem 1rem' : '1.5rem 2rem'
    });
  }, [scrolled, controls]);
  // ? Framer Motion for menu
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
      className={`top-0 left-0 right-0 transition-all ease-out z-50 bg-white border-bottom`}
      animate={controls}
      initial={{ position: 'absolute', padding: '1.5rem 2rem' }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <img className="h-10 ml-1" src={logo} alt="Go Trip" />
        </Link>
        <nav className="flex justify-between items-center gap-2 font-semibold">
          <div className="hidden md:flex text-lg gap-2 items-center h-12 text-black">
            <a href="#" className="rounded-full border border-black px-5 h-full flex items-center">
              LOGIN
            </a>
            <a href="#" className="rounded-full border border-black px-5 h-full flex items-center">
              SIGNUP
            </a>
          </div>

          <div className="hidden md:block cursor-pointer">
            <figure className="h-12 w-12 border border-black rounded-full overflow-hidden">
              <img src="https://i.pinimg.com/564x/9a/3e/48/9a3e48043a2d4980ef887acf6f260116.jpg" alt="Profile Pic" />
            </figure>
          </div>

          {/*//? Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`border border-black p-2 rounded-full text-black`}>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/*//? Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-28 right-5 border border-black p-5 rounded-2xl w-fit bg-white shadow-lg z-50 flex flex-col items-center justify-center gap-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}>
            <div className="flex items-center justify-center gap-3">
              <figure className="h-12 w-12 border border-black rounded-full overflow-hidden">
                <img src="https://i.pinimg.com/564x/9a/3e/48/9a3e48043a2d4980ef887acf6f260116.jpg" alt="Profile Pic" />
              </figure>
              <div>
                <p className="text-base leading-5 font-semibold">Vishal Vishwakarma</p>
                <p className="text-sm font-normal">vishalvish4225@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <a href="#" className="rounded-full w-full border border-black px-5 py-2 text-center">
                LOGIN
              </a>
              <a href="#" className="rounded-full w-full border border-black px-5 py-2 text-center">
                SIGNUP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

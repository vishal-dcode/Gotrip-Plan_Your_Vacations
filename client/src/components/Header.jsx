import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logo from '../assets/gotrip.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

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

  return (
    <motion.header
      className={`top-0 left-0 right-0 transition-all ease-out z-50 bg-white border border-x-0 border-t-0 border-b-black`}
      animate={controls}
      initial={{ position: 'absolute', padding: '1.5rem 2rem' }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <img className="h-10 ml-1" src={logo} alt="Go Trip" />
        </Link>
        <div className="flex justify-between items-center gap-2 font-semibold">
          <div className="text-lg flex gap-2 items-center h-12 text-black">
            <a href="#" className="rounded-full border border-black px-5 h-full flex items-center">
              LOGIN
            </a>
            <a href="#" className="rounded-full border border-black px-5 h-full flex items-center">
              SIGNUP
            </a>
          </div>

          <div className="cursor-pointer">
            <figure className="h-12 w-12 border border-black rounded-full overflow-hidden">
              <img src="https://i.pinimg.com/564x/9a/3e/48/9a3e48043a2d4980ef887acf6f260116.jpg" alt="Profile Pic" />
            </figure>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

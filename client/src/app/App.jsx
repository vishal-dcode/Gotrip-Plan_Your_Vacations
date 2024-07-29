import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import TripDetails from '../pages/TripDetails.jsx';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      marginTop: scrolled ? '0rem' : '92px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    });
  }, [scrolled, controls]);

  return (
    <motion.div animate={controls}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location-detail/:id" element={<TripDetails />} />
      </Routes>
      <Footer />
    </motion.div>
  );
}

export default App;


import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import TripDetails from '../pages/PostDetailPage.jsx';
import TermsAndConditions from '../pages/TermsAndConditions.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import Signout from '../features/auth/containers/Signout.jsx';

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <div>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location-detail/:id" element={<TripDetails />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;


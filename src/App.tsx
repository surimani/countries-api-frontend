import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CountryProvider } from './context/CountryContext';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <CountryProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/country/:code" element={<CountryDetailPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </CountryProvider>
  );
};

export default App;
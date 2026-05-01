/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-royal-900 bg-[url('/main-bg.jpeg')] bg-cover bg-fixed bg-center relative">
          <div className="absolute inset-0 bg-royal-900/80 z-0" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <FloatingContact />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}


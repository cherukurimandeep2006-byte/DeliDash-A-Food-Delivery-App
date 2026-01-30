import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './context/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { RestaurantList } from './pages/RestaurantList';
import { RestaurantMenu } from './pages/RestaurantMenu';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { Auth } from './pages/Auth';
import Profile from './pages/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center text-xs">D</div>
          DeliDash
        </h3>
        <p className="text-gray-400 text-sm">Delicious food delivered to your doorstep. Experience the best local cuisines with fast delivery.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Company</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="hover:text-white cursor-pointer">About Us</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Team</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Contact</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="hover:text-white cursor-pointer">Help & Support</li>
          <li className="hover:text-white cursor-pointer">Partner with us</li>
          <li className="hover:text-white cursor-pointer">Ride with us</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer">Cookie Policy</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} DeliDash. All rights reserved.
    </div>
  </footer>
);

import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    
    return (
        <>
            <Navbar />
            <main className="flex-grow">{children}</main>
            {!isAuthPage && <Footer />}
        </>
    )
}

AppLayout.propTypes = {
  children: PropTypes.node,
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
              <AppLayout>
                <Routes>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/signup" element={<Auth />} />
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/restaurants" element={<ProtectedRoute><RestaurantList /></ProtectedRoute>} />
                  <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantMenu /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><div className="p-10 text-center">Admin Dashboard Placeholder</div></ProtectedRoute>} />
                </Routes>
              </AppLayout>
          </div>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

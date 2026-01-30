import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center transform rotate-3">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">DeliDash</span>
          </Link>

          {/* Desktop Location & Search */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="flex items-center text-sm text-gray-500 mr-4 cursor-pointer hover:text-brand-600 transition-colors">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate max-w-[150px]">New York, NY</span>
            </div>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search for food or restaurant..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
                  Log In
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700 mr-2">Hello, {user?.name || 'User'}</div>
                <div className="relative">
                  <button onClick={() => setIsDropdownOpen(s => !s)} onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsDropdownOpen(s => !s); }
                    if (e.key === 'Escape') setIsDropdownOpen(false);
                  }} aria-expanded={isDropdownOpen} aria-haspopup="true" className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.onerror=null; e.target.src='https://via.placeholder.com/48?text=Avatar'; }} />
                    ) : (
                      <span className="text-sm font-bold text-gray-700">{(user?.name||'U').charAt(0).toUpperCase()}</span>
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div role="menu" tabIndex={-1} onKeyDown={(e) => { if (e.key === 'Escape') setIsDropdownOpen(false); }} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <Link role="menuitem" to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                      <Link role="menuitem" to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>Orders</Link>
                      <Link role="menuitem" to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                      <button role="menuitem" onClick={() => { logout(); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="p-2 text-gray-600 hover:text-brand-600">
               <User className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-600 rounded-full text-[10px] text-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <div className="flex items-center gap-2 text-gray-600 py-2 border-b border-gray-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">New York, NY</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <div className="grid gap-2">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/restaurants" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Orders</Link>
               <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-brand-50" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
            </div>
            <div className="flex gap-2 pt-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Profile</Button>
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex-1">
                    <Button variant="outline" className="w-full">Logout</Button>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};



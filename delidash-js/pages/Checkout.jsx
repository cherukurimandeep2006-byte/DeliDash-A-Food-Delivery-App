import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Banknote } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/tracking');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
       <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-6">
             {/* Address Section */}
             <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-gray-100 p-2 rounded-full"><MapPin className="w-5 h-5 text-gray-700" /></div>
                   <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input type="text" required placeholder="Street Address" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                   <input type="text" required placeholder="Apartment / Suite" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                   <input type="text" required placeholder="City" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                   <input type="text" required placeholder="Zip Code" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                </div>
             </div>

             {/* Payment Section */}
             <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-gray-100 p-2 rounded-full"><CreditCard className="w-5 h-5 text-gray-700" /></div>
                   <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-3">
                   <label className="flex items-center gap-4 p-4 border border-brand-500 bg-brand-50 rounded-lg cursor-pointer transition-all">
                      <input type="radio" name="payment" defaultChecked className="text-brand-600 focus:ring-brand-500 h-4 w-4" />
                      <div className="flex items-center gap-3 flex-1">
                         <div className="bg-white p-2 rounded shadow-sm"><CreditCard className="w-5 h-5 text-brand-600" /></div>
                         <span className="font-medium text-gray-900">Credit / Debit Card</span>
                      </div>
                   </label>
                   
                   <label className="flex items-center gap-4 p-4 border border-gray-200 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                      <input type="radio" name="payment" className="text-brand-600 focus:ring-brand-500 h-4 w-4" />
                      <div className="flex items-center gap-3 flex-1">
                         <div className="bg-white p-2 rounded shadow-sm"><Wallet className="w-5 h-5 text-gray-600" /></div>
                         <span className="font-medium text-gray-900">UPI / Wallet</span>
                      </div>
                   </label>

                   <label className="flex items-center gap-4 p-4 border border-gray-200 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                      <input type="radio" name="payment" className="text-brand-600 focus:ring-brand-500 h-4 w-4" />
                      <div className="flex items-center gap-3 flex-1">
                         <div className="bg-white p-2 rounded shadow-sm"><Banknote className="w-5 h-5 text-green-600" /></div>
                         <span className="font-medium text-gray-900">Cash on Delivery</span>
                      </div>
                   </label>
                </div>
             </div>

             <Button type="submit" size="lg" className="w-full py-4 text-lg shadow-xl" isLoading={loading}>
                Place Order
             </Button>
          </form>
       </div>
    </div>
  );
};

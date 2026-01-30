import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();

  const TAX_RATE = 0.05; // 5% GST standard for food in India
  const DELIVERY_FEE = 40; // ₹40 delivery fee
  const tax = totalAmount * TAX_RATE;
  const finalTotal = totalAmount + tax + (cart.length > 0 ? DELIVERY_FEE : 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
          alt="Empty Cart" 
          className="w-48 h-48 opacity-50 mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you have not added anything yet.</p>
        <Link to="/restaurants">
           <Button>See Restaurants Near You</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
         
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
                    <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700">Clear Cart</button>
                 </div>
                 
                 <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                         <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm">₹{item.price}</p>
                         </div>
                         <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-1 border border-brand-100">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center bg-white rounded text-brand-600 shadow-sm hover:bg-brand-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-brand-700 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white rounded text-brand-600 shadow-sm hover:bg-brand-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                         </div>
                         <div className="text-right min-w-[60px]">
                            <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(0)}</p>
                         </div>
                         <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 ml-2">
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>

               {/* Offers */}
               <div className="bg-white rounded-xl shadow-sm p-6 border border-dashed border-brand-200">
                  <div className="flex items-center gap-4">
                     <div className="bg-brand-100 p-2 rounded-full text-brand-600">
                        <span className="font-bold text-lg">%</span>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-bold text-gray-800">Apply Coupon</h3>
                        <p className="text-xs text-gray-500">Save more with coupons</p>
                     </div>
                     <button className="text-brand-600 font-bold text-sm hover:underline">VIEW OFFERS</button>
                  </div>
               </div>
            </div>

            {/* Summary */}
            <div className="lg:w-1/3">
               <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Bill Details</h2>
                  
                  <div className="space-y-3 mb-6">
                     <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹{DELIVERY_FEE.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-gray-600">
                        <span>Taxes & Charges (5%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                     </div>
                     <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                        <span>To Pay</span>
                        <span>₹{finalTotal.toFixed(2)}</span>
                     </div>
                  </div>

                  <Link to="/checkout">
                     <Button size="lg" className="w-full justify-between group">
                        <span>Checkout</span>
                        <span className="bg-brand-700/20 px-2 py-1 rounded text-sm group-hover:bg-brand-700/30">
                          ₹{finalTotal.toFixed(2)}
                        </span>
                     </Button>
                  </Link>
                  <p className="text-xs text-gray-400 text-center mt-3">Secure Checkout powered by Stripe</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

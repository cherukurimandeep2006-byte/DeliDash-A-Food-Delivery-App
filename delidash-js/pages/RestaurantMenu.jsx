import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Heart, Share2 } from 'lucide-react';
import { MOCK_RESTAURANTS } from '../constants';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

export const RestaurantMenu = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);

  if (!restaurant) return <div className="p-10 text-center">Restaurant not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
       {/* Restaurant Header */}
       <div className="bg-white shadow-sm sticky top-16 z-30">
          <div className="max-w-4xl mx-auto px-4 py-8">
             <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                   <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                   <p className="text-gray-500 mb-2">{restaurant.cuisine.join(', ')}</p>                      <div className="mt-4 w-full h-48 overflow-hidden rounded-lg">
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x500?text=Image+Unavailable'; }} />
                      </div>                   <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.distance}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</span>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2"><Heart className="w-4 h-4" /> Favorite</Button>
                      <Button variant="ghost" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                   </div>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center min-w-[100px]">
                   <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-xl mb-1">
                      <Star className="w-5 h-5 fill-current" /> {restaurant.rating}
                   </div>
                   <p className="text-xs text-gray-400 border-t pt-2 mt-1">1k+ Ratings</p>
                </div>
             </div>
          </div>
       </div>

       {/* Menu List */}
       <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended</h2>
          
          <div className="space-y-6">
             {restaurant.menu.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex justify-between gap-4">
                   <div className="flex-1">
                      <div className="mb-1">
                        {item.isVeg ? (
                            <span className="border border-green-500 text-green-500 text-[10px] p-0.5 rounded-sm">VEG</span>
                        ) : (
                             <span className="border border-red-500 text-red-500 text-[10px] p-0.5 rounded-sm">NON-VEG</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                      <p className="font-medium text-gray-800 mb-2">₹{item.price}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                   </div>
                   
                   <div className="relative w-32 h-32 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500x500?text=Image+Unavailable'; }} />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                         <Button 
                           size="sm" 
                           className="shadow-lg bg-orange text-black-700 hover:bg-green-50 border border-green-200 px-8 uppercase text-sm font-bold"
                           onClick={() => {
                              addToCart(item);
                              // Simple native toast alert
                              alert(`${item.name} added to cart!`);
                           }}
                         >
                           ADD
                         </Button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};
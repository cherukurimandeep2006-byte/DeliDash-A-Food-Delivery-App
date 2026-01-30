import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CATEGORIES, MOCK_RESTAURANTS } from '../constants';

export const Home = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-brand-50 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-brand-600 text-sm font-semibold mb-4">
              Hungry? We got you.
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Delicious Food, <br/>
              <span className="text-brand-500">Delivered To You.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Order from the best local restaurants with easy, on-demand delivery. Fresh, fast, and right at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/restaurants">
                <Button size="lg" className="w-full sm:w-auto">Order Now</Button>
              </Link>
              <Link to="/restaurants">
                 <Button variant="outline" size="lg" className="w-full sm:w-auto">View Offers</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-brand-200 rounded-full opacity-20 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop" 
                  alt="Delicious Food" 
                  className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x800?text=No+Image'; }}
                />
                
                {/* Floating Cards */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up">
                   <div className="bg-green-100 p-2 rounded-full text-green-600">
                     <Clock className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Delivery Time</p>
                     <p className="font-bold text-gray-900">25 Mins</p>
                   </div>
                </div>

                <div className="absolute top-10 -right-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up" style={{animationDelay: '0.2s'}}>
                   <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                     <Star className="w-5 h-5 fill-current" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Top Rated</p>
                     <p className="font-bold text-gray-900">4.9/5</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Inspiration for your first order</h2>
          <Link to="/restaurants" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1 text-sm">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
          {CATEGORIES.map((cat) => (
            <Link to={`/restaurants?category=${cat.name}`} key={cat.id} className="flex-shrink-0 snap-start group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-brand-500 transition-all">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }} />
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-brand-600">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Restaurants Near You</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {MOCK_RESTAURANTS.slice(0, 4).map((rest) => (
                 <Link to={`/restaurant/${rest.id}`} key={rest.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x500?text=No+Image'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      {rest.offer && (
                        <div className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                          {rest.offer}
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                         <Clock className="w-3 h-3 text-green-600" /> {rest.deliveryTime}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">{rest.name}</h3>
                         <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded text-green-700 text-xs font-bold">
                           {rest.rating} <Star className="w-3 h-3 fill-current" />
                         </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{rest.cuisine.join(', ')}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
                         <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {rest.distance}</span>
                         <span>₹{rest.priceForTwo} for two</span>
                      </div>
                    </div>
                 </Link>
               ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/restaurants">
                 <Button variant="secondary" size="lg" className="px-10">See All Restaurants</Button>
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

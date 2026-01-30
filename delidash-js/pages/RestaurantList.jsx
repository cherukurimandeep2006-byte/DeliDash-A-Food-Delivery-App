import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, MapPin } from 'lucide-react';
import { MOCK_RESTAURANTS } from '../constants';
import { Button } from '../components/ui/Button';

export const RestaurantList = () => {
  const [filterVeg, setFilterVeg] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Basic sorting logic for demo
  const sortedRestaurants = [...MOCK_RESTAURANTS].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'time') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime); // simplified
    if (sortBy === 'cost') return a.priceForTwo - b.priceForTwo;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Restaurants Near You</h1>
             <p className="text-gray-500 mt-1">{MOCK_RESTAURANTS.length} restaurants offering delivery</p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-brand-500"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating: High to Low</option>
                <option value="time">Delivery Time: Low to High</option>
                <option value="cost">Cost: Low to High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <Button 
              variant={filterVeg ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setFilterVeg(!filterVeg)}
            >
              Pure Veg
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
               <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((rest) => (
             <Link to={`/restaurant/${rest.id}`} key={rest.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="relative h-56">
                  <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x500?text=No+Image'; }} />
                  {rest.offer && (
                    <div className="absolute bottom-4 left-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-r shadow-md">
                      {rest.offer}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                    {rest.deliveryTime}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                     <h2 className="text-xl font-bold text-gray-900">{rest.name}</h2>
                     <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded text-green-700 text-sm font-bold">
                       {rest.rating} <Star className="w-3 h-3 fill-current" />
                     </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{rest.cuisine.join(', ')}</p>
                  
                  <div className="mt-auto border-t border-dashed border-gray-200 pt-4 flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {rest.distance}</span>
                    <span className="font-medium text-gray-700">₹{rest.priceForTwo} for two</span>
                  </div>
                  
                  <div className="mt-4 pt-2 group-hover:pt-0 group-hover:h-auto overflow-hidden transition-all">
                      <span className="text-brand-600 text-sm font-medium group-hover:underline">View Menu</span>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

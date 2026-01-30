import React from 'react';
import { CheckCircle, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrderTracking = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
         
         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="bg-brand-500 p-6 text-white text-center">
               <h1 className="text-2xl font-bold mb-1">Order Placed Successfully!</h1>
               <p className="opacity-90">Estimated Delivery: 25-30 Mins</p>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                  <span className="flex items-center gap-2"><MapPin /> Live Map Tracking Visualization</span>
               </div>
               {/* Delivery Guy Overlay */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce">
                      <span className="text-2xl">🛵</span>
                   </div>
               </div>
            </div>
            
            <div className="p-8">
               {/* Timeline */}
               <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                     <div className="relative flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white z-10 shadow-md">
                           <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Order Confirmed</h3>
                           <p className="text-sm text-gray-500">12:30 PM</p>
                        </div>
                     </div>

                     <div className="relative flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white z-10 shadow-md">
                           <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Preparing Food</h3>
                           <p className="text-sm text-gray-500">12:35 PM</p>
                        </div>
                     </div>

                     <div className="relative flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white z-10 shadow-md ring-4 ring-brand-100">
                           <Clock className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                           <h3 className="font-bold text-brand-600">Out for Delivery</h3>
                           <p className="text-sm text-gray-500">On the way</p>
                        </div>
                     </div>

                     <div className="relative flex items-center gap-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 z-10">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Delivered</h3>
                           <p className="text-sm text-gray-500">Estimated 1:00 PM</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Delivery Partner */}
               <div className="mt-8 p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Driver" />
                     </div>
                     <div>
                        <h4 className="font-bold text-gray-900">John Doe</h4>
                        <p className="text-xs text-gray-500">Delivery Partner</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 bg-white rounded-full text-brand-500 shadow-sm hover:bg-brand-50"><Phone className="w-5 h-5" /></button>
                     <button className="p-2 bg-white rounded-full text-brand-500 shadow-sm hover:bg-brand-50"><MessageSquare className="w-5 h-5" /></button>
                  </div>
               </div>
               
               <div className="mt-6 flex justify-center">
                   <Button variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600">Cancel Order</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

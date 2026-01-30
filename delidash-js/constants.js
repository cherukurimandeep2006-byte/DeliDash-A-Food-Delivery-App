export const CATEGORIES = [
  { id: 1, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop' },
  { id: 2, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop' },
  { id: 3, name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=150&h=150&fit=crop' },
  { id: 4, name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=150&h=150&fit=crop' },
  { id: 5, name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop' },
  { id: 6, name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=150&h=150&fit=crop' },
  { id: 7, name: 'Japanese', image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=150&h=150&fit=crop' },
  { id: 8, name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=150&h=150&fit=crop' },
];

const createMenuItem = (id, name, desc, price, veg, cat, img) => ({
  id, 
  name, 
  description: desc, 
  price, 
  isVeg: veg, 
  category: cat, 
  image: img, 
  rating: 4 + Math.random(), 
  votes: Math.floor(Math.random() * 100) + 50
});

export const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Pizza Paradise',
    cuisine: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '30-40 min',
    priceForTwo: 600,
    distance: '2.5 km',
    offer: '50% OFF up to ₹100',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('1-1', 'Margherita Pizza', 'Classic delight with 100% real mozzarella cheese.', 299, true, 'Pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop'),
        createMenuItem('1-2', 'Farmhouse Pizza', 'Delightful combination of onion, capsicum, tomato & grilled mushroom.', 399, true, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop'),
        createMenuItem('1-3', 'Pepperoni Pizza', 'American classic! Spicy pepperoni, mozzarella cheese.', 459, false, 'Pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=500&fit=crop'),
        createMenuItem('1-4', 'Garlic Breadsticks', 'Baked to perfection. Cheesy and garlicky.', 149, true, 'Sides', 'https://images.unsplash.com/photo-1573140247632-f84660f67627?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '2',
    name: 'Burger Kingpin',
    cuisine: ['American', 'Burgers'],
    rating: 4.2,
    deliveryTime: '25-35 min',
    priceForTwo: 450,
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('2-1', 'Classic Chicken Burger', 'Crispy chicken patty topped with jalapeños and spicy sauce.', 199, false, 'Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'),
        createMenuItem('2-2', 'Veggie Supreme', 'A loaded veggie patty with cheese and special sauce.', 149, true, 'Burger', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop'),
        createMenuItem('2-3', 'Peri Peri Fries', 'Crispy fries tossed in spicy peri peri masala.', 119, true, 'Sides', 'https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '3',
    name: 'Spice Route',
    cuisine: ['Indian', 'Biryani', 'Curry'],
    rating: 4.8,
    deliveryTime: '45-55 min',
    priceForTwo: 800,
    distance: '4.2 km',
    offer: 'Free Delivery',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('3-1', 'Hyderabadi Chicken Biryani', 'Aromatic basmati rice cooked with tender chicken and spices.', 349, false, 'Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=500&fit=crop'),
        createMenuItem('3-2', 'Paneer Butter Masala', 'Cottage cheese simmered in a rich tomato and cashew gravy.', 289, true, 'Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=500&fit=crop'),
        createMenuItem('3-3', 'Butter Naan', 'Soft and fluffy Indian bread topped with butter.', 45, true, 'Breads', 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '4',
    name: 'Sushi Master',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.6,
    deliveryTime: '35-45 min',
    priceForTwo: 1200,
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('4-1', 'Salmon Nigiri', 'Fresh slice of salmon over pressed vinegared rice.', 499, false, 'Sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&h=500&fit=crop'),
        createMenuItem('4-2', 'Spicy Tuna Roll', 'Tuna, spicy mayo, and cucumber wrapped in seaweed and rice.', 399, false, 'Sushi', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=500&fit=crop'),
        createMenuItem('4-3', 'Tempura Prawns', 'Crispy batter-fried prawns served with dip.', 350, false, 'Starters', 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '5',
    name: 'Green Bowl',
    cuisine: ['Healthy', 'Salads', 'Vegan'],
    rating: 4.3,
    deliveryTime: '20-30 min',
    priceForTwo: 500,
    distance: '1.2 km',
    offer: '20% OFF',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('5-1', 'Greek Quinoa Salad', 'Fresh veggies, feta cheese, olives, and quinoa with dressing.', 299, true, 'Salad', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop'),
        createMenuItem('5-2', 'Berry Blast Smoothie', 'Blend of mixed berries, yogurt, and honey.', 199, true, 'Beverage', 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&h=500&fit=crop'),
        createMenuItem('5-3', 'Avocado Toast', 'Toasted sourdough topped with smashed avocado and seasoning.', 249, true, 'Snack', 'https://images.unsplash.com/photo-1588137372308-15f09a043d82?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '6',
    name: 'The Dragon Bowl',
    cuisine: ['Chinese', 'Asian', 'Thai'],
    rating: 4.4,
    deliveryTime: '30-45 min',
    priceForTwo: 650,
    distance: '2.8 km',
    offer: 'Buy 1 Get 1',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('6-1', 'Hakka Noodles', 'Stir-fried noodles with crunchy vegetables and soy sauce.', 220, true, 'Noodles', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=500&fit=crop'),
        createMenuItem('6-2', 'Kung Pao Chicken', 'Spicy stir-fry with chicken, peanuts, vegetables, and chili peppers.', 320, false, 'Main Course', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&h=500&fit=crop'),
        createMenuItem('6-3', 'Chicken Dim Sums', 'Steamed dumplings filled with minced chicken and herbs.', 250, false, 'Starters', 'https://images.unsplash.com/photo-1496116218417-1a781b1c423c?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '7',
    name: 'Taco Mexicana',
    cuisine: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.1,
    deliveryTime: '25-40 min',
    priceForTwo: 550,
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('7-1', 'Crunchy Chicken Tacos', 'Crispy corn shells filled with seasoned chicken, lettuce, and cheese.', 220, false, 'Tacos', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=500&fit=crop'),
        createMenuItem('7-2', 'Loaded Nachos', 'Tortilla chips topped with melted cheese, jalapeños, and salsa.', 199, true, 'Snack', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&h=500&fit=crop'),
        createMenuItem('7-3', 'Veggie Burrito Bowl', 'Rice, beans, corn, salsa, and guacamole in a bowl.', 279, true, 'Main Course', 'https://images.unsplash.com/photo-1584269668383-7c8fa074c76a?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '8',
    name: 'Seoul Kitchen',
    cuisine: ['Korean', 'Asian', 'BBQ'],
    rating: 4.7,
    deliveryTime: '40-50 min',
    priceForTwo: 1000,
    distance: '5.0 km',
    offer: 'Free Kimchi',
    image: 'https://images.unsplash.com/photo-1553163147-621957516919?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('8-1', 'Bibimbap', 'Mixed rice with meat and assorted vegetables.', 450, false, 'Rice', 'https://images.unsplash.com/photo-1553163147-621957516919?w=500&h=500&fit=crop'),
        createMenuItem('8-2', 'Korean Fried Chicken', 'Double-fried crispy chicken glazed in spicy sauce.', 399, false, 'Starters', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=500&fit=crop'),
        createMenuItem('8-3', 'Kimchi Jjigae', 'Spicy stew made with kimchi, pork belly and tofu.', 350, false, 'Stew', 'https://images.unsplash.com/photo-1583225214464-9296e022b38b?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '9',
    name: 'Sweet Tooth Bakery',
    cuisine: ['Dessert', 'Bakery', 'Cakes'],
    rating: 4.9,
    deliveryTime: '15-25 min',
    priceForTwo: 350,
    distance: '1.0 km',
    image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('9-1', 'Red Velvet Slice', 'Rich red velvet sponge with cream cheese frosting.', 180, true, 'Cake', 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&h=500&fit=crop'),
        createMenuItem('9-2', 'Chocolate Truffle', 'Decadent chocolate cake with rich ganache.', 160, true, 'Cake', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop'),
        createMenuItem('9-3', 'Blueberry Cheesecake', 'Creamy cheesecake topped with blueberry compote.', 220, true, 'Cheesecake', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '10',
    name: 'Mediterranean Delights',
    cuisine: ['Mediterranean', 'Lebanese'],
    rating: 4.5,
    deliveryTime: '35-45 min',
    priceForTwo: 900,
    distance: '4.5 km',
    offer: '15% OFF',
    image: 'https://images.unsplash.com/photo-1544336074-9b2f65a64303?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('10-1', 'Hummus & Pita Platter', 'Creamy hummus served with warm pita bread.', 249, true, 'Platter', 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=500&h=500&fit=crop'),
        createMenuItem('10-2', 'Falafel Wrap', 'Crispy falafels wrapped with veggies and tahini.', 199, true, 'Wrap', 'https://images.unsplash.com/photo-1563245372-f21720e32c4d?w=500&h=500&fit=crop'),
        createMenuItem('10-3', 'Chicken Shawarma', 'Grilled chicken strips in pita with garlic sauce.', 220, false, 'Wrap', 'https://images.unsplash.com/photo-1529006557810-274bc9b2fc49?w=500&h=500&fit=crop'),
    ]
  },
  {
    id: '11',
    name: 'The Curry House',
    cuisine: ['North Indian', 'Thali', 'Mughlai'],
    rating: 4.0,
    deliveryTime: '40-50 min',
    priceForTwo: 700,
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1632560354025-0641005e6c4e?w=800&h=500&fit=crop',
    menu: [
        createMenuItem('11-1', 'Dal Makhani', 'Whole black lentils simmered overnight with butter and cream.', 280, true, 'Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=500&fit=crop'),
        createMenuItem('11-2', 'Butter Chicken', 'Chicken cooked in a rich and creamy tomato sauce.', 350, false, 'Curry', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=500&fit=crop'),
        createMenuItem('11-3', 'Special Thali', 'Assortment of dal, paneer, roti, rice, and sweet.', 299, true, 'Thali', 'https://images.unsplash.com/photo-1632560354025-0641005e6c4e?w=500&h=500&fit=crop'),
    ]
  }
];

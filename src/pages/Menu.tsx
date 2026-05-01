import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Minus, X, CheckCircle, MapPin, MessageCircle, ChevronUp, Locate, Lock, RotateCw, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OrderItem {
  name: string;
  originalPrice: number;
  quantity: number;
  isDiscountEligible: boolean;
}

const isDiscountEligible = (category: string) => {
  return !['Desserts', 'Mocktails', 'Milk Shakes', 'Hot Coffee & Tea'].includes(category);
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const categories = [
  'All', 
  'Soups',
  'Mocktails',
  'Pizzas',
  'Sandwiches',
  'Chinese Starters', 
  'Tandoori Starters', 
  'Indian Main Course', 
  'Indian Breads',
  'Milk Shakes',
  'Hot Coffee & Tea',
  'Rajasthani Special',
  'Salads',
  'Desserts'
];

const menuItems = [
  // Soups
  { name: 'Manchow Soup', category: 'Soups', price: '₹99', popular: true, type: 'veg' },
  { name: 'Hot & Sour Soup', category: 'Soups', price: '₹99', popular: false, type: 'veg' },
  { name: 'Sweet Corn Soup', category: 'Soups', price: '₹110', popular: true, type: 'veg' },
  { name: 'Lemon Coriander Soup', category: 'Soups', price: '₹99', popular: false, type: 'veg' },
  { name: 'Tomato Basil Soup', category: 'Soups', price: '₹119', popular: false, type: 'veg' },
  { name: 'Almond Brocoli Soup', category: 'Soups', price: '₹119', popular: true, type: 'veg' },
  { name: 'Roasted Bell Pepper Soup', category: 'Soups', price: '₹119', popular: false, type: 'veg' },
  { name: 'Clear Soup', category: 'Soups', price: '₹99', popular: false, type: 'veg' },
  { name: 'Creamy & Mushroom Soup', category: 'Soups', price: '₹129', popular: false, type: 'veg' },

  // Mocktails
  { name: 'Spicy Mango', category: 'Mocktails', price: '₹159', popular: true, type: 'drinks' },
  { name: 'Purple Orchid', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Black Current Mojito', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Blue Lagoon', category: 'Mocktails', price: '₹129', popular: true, type: 'drinks' },
  { name: 'Blueberry Mojito', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Orange Mojito', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Fuzi Island', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Mint Caprioska', category: 'Mocktails', price: '₹129', popular: false, type: 'drinks' },
  { name: 'Russian Summer', category: 'Mocktails', price: '₹179', popular: false, type: 'drinks' },
  { name: 'Masala Lemonade', category: 'Mocktails', price: '₹99', popular: true, type: 'drinks' },
  { name: 'Fresh Lime Soda', category: 'Mocktails', price: '₹99', popular: false, type: 'drinks' },
  { name: 'Fresh Lime Juice', category: 'Mocktails', price: '₹79', popular: false, type: 'drinks' },
  { name: 'Italian Ceramusa', category: 'Mocktails', price: '₹129', popular: false, type: 'drinks' },
  { name: 'Bubble Gum Berry Blast', category: 'Mocktails', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Peach Lemonade', category: 'Mocktails', price: '₹129', popular: false, type: 'drinks' },

  // Pizzas
  { name: 'Classic Margertta Pizza', category: 'Pizzas', price: '₹239', popular: true, type: 'veg' },
  { name: 'Al-Fungi Pizza', category: 'Pizzas', price: '₹239', popular: false, type: 'veg' },
  { name: 'Corn Onion Pizza', category: 'Pizzas', price: '₹239', popular: true, type: 'veg' },
  { name: 'OTC Pizza', category: 'Pizzas', price: '₹239', popular: false, type: 'veg' },
  { name: 'All Vegies Pizza', category: 'Pizzas', price: '₹239', popular: true, type: 'veg' },
  { name: 'Chilli Paneer Pizza', category: 'Pizzas', price: '₹269', popular: true, type: 'veg' },
  { name: 'Paneer Tikka Pizza', category: 'Pizzas', price: '₹269', popular: true, type: 'veg' },
  { name: 'Chilli Mushroom Pizza', category: 'Pizzas', price: '₹249', popular: false, type: 'veg' },

  // Sandwiches
  { name: 'Tandoori Paneer Tikka Sandwich', category: 'Sandwiches', price: '₹219', popular: true, type: 'veg' },
  { name: 'Plain Cucumber Sandwich', category: 'Sandwiches', price: '₹199', popular: false, type: 'veg' },
  { name: 'Colelow Sandwich', category: 'Sandwiches', price: '₹169', popular: false, type: 'veg' },
  { name: 'Grilled Mushroom & Slice Chesse Sandwich', category: 'Sandwiches', price: '₹199', popular: false, type: 'veg' },
  { name: 'Club Sandwich', category: 'Sandwiches', price: '₹199', popular: true, type: 'veg' },
  { name: 'Grilled Paneer Sandwich', category: 'Sandwiches', price: '₹199', popular: true, type: 'veg' },

  // Chinese Starters
  { name: 'Veg Noodels', category: 'Chinese Starters', price: '₹199', popular: false, type: 'veg' },
  { name: 'Hakka Noodels', category: 'Chinese Starters', price: '₹229', popular: true, type: 'veg' },
  { name: 'Singapur Noodels', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Hong Kong Noodels', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Chilli Patato', category: 'Chinese Starters', price: '₹191', popular: true, type: 'veg' },
  { name: 'Chilli Paneer', category: 'Chinese Starters', price: '₹249', popular: true, type: 'veg' },
  { name: 'Veg Manchurian Dry / Gravy', category: 'Chinese Starters', price: '₹239', popular: true, type: 'veg' },
  { name: 'Momo', category: 'Chinese Starters', price: '₹149', popular: true, type: 'veg' },
  { name: 'Veg Fried Rice', category: 'Chinese Starters', price: '₹199', popular: false, type: 'veg' },
  { name: 'Veg Tirpple Fried Rice', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Shizwan Fried Rice', category: 'Chinese Starters', price: '₹219', popular: true, type: 'veg' },
  { name: 'Paneer Fried Rice', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Corn Salt And Pepper', category: 'Chinese Starters', price: '₹189', popular: false, type: 'veg' },
  { name: 'Veg 65', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Peri Peri Fries', category: 'Chinese Starters', price: '₹119', popular: true, type: 'veg' },
  { name: 'Crispy Corn', category: 'Chinese Starters', price: '₹229', popular: true, type: 'veg' },
  { name: 'Veg Hot Garlic Sauce', category: 'Chinese Starters', price: '₹229', popular: false, type: 'veg' },
  { name: 'French Fries', category: 'Chinese Starters', price: '₹99', popular: true, type: 'veg' },
  { name: 'Chilli Baby Corn', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Chilli Musroom', category: 'Chinese Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Veg Lolipop', category: 'Chinese Starters', price: '₹239', popular: false, type: 'veg' },
  { name: 'Crispy Lotus Steam', category: 'Chinese Starters', price: '₹229', popular: false, type: 'veg' },

  // Tandoori Starters
  { name: 'Dahi Ke Sholey', category: 'Tandoori Starters', price: '₹249', popular: true, type: 'veg' },
  { name: 'Hariyali Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: false, type: 'veg' },
  { name: 'Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: true, type: 'veg' },
  { name: 'Malai Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: true, type: 'veg' },
  { name: 'Peri Peri Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: true, type: 'veg' },
  { name: 'Afgani Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: false, type: 'veg' },
  { name: 'Achari Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: false, type: 'veg' },
  { name: 'Peshawari Paneer Tikka', category: 'Tandoori Starters', price: '₹299', popular: false, type: 'veg' },
  { name: 'Mashroom Tikka', category: 'Tandoori Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Malai Soya Chaap', category: 'Tandoori Starters', price: '₹289', popular: true, type: 'veg' },
  { name: 'Achari Soya Chaap', category: 'Tandoori Starters', price: '₹259', popular: false, type: 'veg' },
  { name: 'Tandoori Soya Chaap', category: 'Tandoori Starters', price: '₹259', popular: true, type: 'veg' },
  { name: 'Afgani Soya Chaap', category: 'Tandoori Starters', price: '₹259', popular: false, type: 'veg' },
  { name: 'Tandoori Mashroom', category: 'Tandoori Starters', price: '₹259', popular: false, type: 'veg' },
  { name: 'Hara Bhara Kabab', category: 'Tandoori Starters', price: '₹249', popular: true, type: 'veg' },
  { name: 'Beetroot Kabab', category: 'Tandoori Starters', price: '₹249', popular: false, type: 'veg' },
  { name: 'Dahi Ke Kabab', category: 'Tandoori Starters', price: '₹299', popular: true, type: 'veg' },
  { name: 'Veg Platter (Chef Special)', category: 'Tandoori Starters', price: '₹599', popular: true, type: 'veg' },

  // Indian Main Course
  { name: 'Dal Fry', category: 'Indian Main Course', price: '₹219', popular: false, type: 'veg' },
  { name: 'Dal Tadka', category: 'Indian Main Course', price: '₹229', popular: true, type: 'veg' },
  { name: 'Dal Makhani', category: 'Indian Main Course', price: '₹249', popular: true, type: 'veg' },
  { name: 'Dal Makhani Tadka', category: 'Indian Main Course', price: '₹259', popular: false, type: 'veg' },
  { name: 'Kadai Paneer', category: 'Indian Main Course', price: '₹299', popular: true, type: 'veg' },
  { name: 'Paneer Butter Masala', category: 'Indian Main Course', price: '₹299', popular: true, type: 'veg' },
  { name: 'Palak Paneer', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Paneer Do Pyaza', category: 'Indian Main Course', price: '₹299', popular: false, type: 'veg' },
  { name: 'Paneer Handi', category: 'Indian Main Course', price: '₹299', popular: false, type: 'veg' },
  { name: 'Paneer Labadar', category: 'Indian Main Course', price: '₹299', popular: true, type: 'veg' },
  { name: 'Paneer Pasanda', category: 'Indian Main Course', price: '₹299', popular: true, type: 'veg' },
  { name: 'Paneer Mushroom', category: 'Indian Main Course', price: '₹299', popular: false, type: 'veg' },
  { name: 'Paneer Kofta', category: 'Indian Main Course', price: '₹299', popular: false, type: 'veg' },
  { name: 'Mix Veg', category: 'Indian Main Course', price: '₹249', popular: true, type: 'veg' },
  { name: 'Veg Handi', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Veg Kadhai', category: 'Indian Main Course', price: '₹229', popular: false, type: 'veg' },
  { name: 'Veg Kofta', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Veg Maratha', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Veg Kollapuri', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Veg Rada', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Methi Mutter', category: 'Indian Main Course', price: '₹199', popular: false, type: 'veg' },
  { name: 'Aalu Mutter', category: 'Indian Main Course', price: '₹199', popular: false, type: 'veg' },
  { name: 'Aalu Palak', category: 'Indian Main Course', price: '₹229', popular: false, type: 'veg' },
  { name: 'Aalu Zeera', category: 'Indian Main Course', price: '₹199', popular: true, type: 'veg' },
  { name: 'Dum Aalu Punjabi', category: 'Indian Main Course', price: '₹299', popular: true, type: 'veg' },
  { name: 'Bhindi Kurkure', category: 'Indian Main Course', price: '₹229', popular: true, type: 'veg' },
  { name: 'Bhindi Fry', category: 'Indian Main Course', price: '₹229', popular: false, type: 'veg' },
  { name: 'Dahi Kidhi Masala', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Began Bharta', category: 'Indian Main Course', price: '₹249', popular: false, type: 'veg' },
  { name: 'Began Masala', category: 'Indian Main Course', price: '₹219', popular: false, type: 'veg' },
  { name: 'Methi Mutter Malai', category: 'Indian Main Course', price: '₹249', popular: true, type: 'veg' },

  // Indian Breads
  { name: 'Tandoori Roti', category: 'Indian Breads', price: '₹18', popular: true, type: 'veg' },
  { name: 'Tandoori Butter Roti', category: 'Indian Breads', price: '₹24', popular: true, type: 'veg' },
  { name: 'Tawa Roti', category: 'Indian Breads', price: '₹12', popular: false, type: 'veg' },
  { name: 'Tawa Butter Roti', category: 'Indian Breads', price: '₹16', popular: false, type: 'veg' },
  { name: 'Plain Naan', category: 'Indian Breads', price: '₹45', popular: false, type: 'veg' },
  { name: 'Butter Naan', category: 'Indian Breads', price: '₹55', popular: true, type: 'veg' },
  { name: 'Garlic Naan', category: 'Indian Breads', price: '₹59', popular: true, type: 'veg' },
  { name: 'Missi Roti', category: 'Indian Breads', price: '₹45', popular: false, type: 'veg' },
  { name: 'Stuffed Kulcha', category: 'Indian Breads', price: '₹89', popular: true, type: 'veg' },
  { name: 'Lacha Paratha', category: 'Indian Breads', price: '₹55', popular: true, type: 'veg' },
  { name: 'Pudina Paratha', category: 'Indian Breads', price: '₹59', popular: false, type: 'veg' },
  { name: 'Pyaaz Kulcha', category: 'Indian Breads', price: '₹55', popular: false, type: 'veg' },

  // Milk Shakes
  { name: 'Cold Coffee With Ice Cream', category: 'Milk Shakes', price: '₹139', popular: true, type: 'drinks' },
  { name: 'Banana Milkshake', category: 'Milk Shakes', price: '₹110', popular: false, type: 'drinks' },
  { name: 'Cold Coffee', category: 'Milk Shakes', price: '₹119', popular: true, type: 'drinks' },
  { name: 'Oreo Milkshake', category: 'Milk Shakes', price: '₹139', popular: true, type: 'drinks' },
  { name: 'Chocolate Milkshake', category: 'Milk Shakes', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Butter Scotch Milkshake', category: 'Milk Shakes', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Strewberry Milkshake', category: 'Milk Shakes', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Mango Milkshake', category: 'Milk Shakes', price: '₹149', popular: true, type: 'drinks' },
  { name: 'Dry Fruit Milkshake', category: 'Milk Shakes', price: '₹179', popular: true, type: 'drinks' },
  { name: 'Black Current Milkshake', category: 'Milk Shakes', price: '₹139', popular: false, type: 'drinks' },
  { name: 'Blueberry Milkshake', category: 'Milk Shakes', price: '₹129', popular: false, type: 'drinks' },
  { name: 'Vanila Milkshake', category: 'Milk Shakes', price: '₹129', popular: false, type: 'drinks' },
  { name: 'Kitkat Milkshake', category: 'Milk Shakes', price: '₹139', popular: true, type: 'drinks' },

  // Hot Coffee & Tea
  { name: 'Capichino', category: 'Hot Coffee & Tea', price: '₹89', popular: true, type: 'drinks' },
  { name: 'Mocaccino', category: 'Hot Coffee & Tea', price: '₹101', popular: false, type: 'drinks' },
  { name: 'Black Coffee', category: 'Hot Coffee & Tea', price: '₹49', popular: false, type: 'drinks' },
  { name: 'Hot Chocolate', category: 'Hot Coffee & Tea', price: '₹119', popular: true, type: 'drinks' },
  { name: 'Caffe Latte', category: 'Hot Coffee & Tea', price: '₹99', popular: false, type: 'drinks' },
  { name: 'Lemon Tea', category: 'Hot Coffee & Tea', price: '₹49', popular: false, type: 'drinks' },
  { name: 'Ginger Tea', category: 'Hot Coffee & Tea', price: '₹30', popular: true, type: 'drinks' },
  { name: 'Masala Tea', category: 'Hot Coffee & Tea', price: '₹30', popular: true, type: 'drinks' },
  { name: 'Plain Tea', category: 'Hot Coffee & Tea', price: '₹30', popular: false, type: 'drinks' },

  // Rajasthani Special
  { name: 'Rajasthani Thali', category: 'Rajasthani Special', price: '₹350', popular: true, type: 'veg' },
  { name: 'Besan Gatte Ki Sabji', category: 'Rajasthani Special', price: '₹179', popular: false, type: 'veg' },
  { name: 'Gwarfali Ki Kadhi', category: 'Rajasthani Special', price: '₹159', popular: false, type: 'veg' },
  { name: 'Kair Sangri', category: 'Rajasthani Special', price: '₹349', popular: true, type: 'veg' },
  { name: 'Saag Roti', category: 'Rajasthani Special', price: '₹450', popular: true, type: 'veg' },
  { name: 'Dal Bhatti Churma', category: 'Rajasthani Special', price: '₹349', popular: true, type: 'veg' },
  { name: 'Mooli Ki Sabji', category: 'Rajasthani Special', price: '₹149', popular: false, type: 'veg' },
  { name: 'Kheer Churma', category: 'Rajasthani Special', price: '₹199', popular: true, type: 'veg' },

  // Salads
  { name: 'Cleaser Salad', category: 'Salads', price: '₹129', popular: false, type: 'veg' },
  { name: 'Quinua Beetroot Salad', category: 'Salads', price: '₹199', popular: true, type: 'veg' },
  { name: 'Creamy Cucumber Salad', category: 'Salads', price: '₹129', popular: false, type: 'veg' },
  { name: 'Green Salad', category: 'Salads', price: '₹99', popular: true, type: 'veg' },
  { name: 'Fattoush Salad', category: 'Salads', price: '₹149', popular: false, type: 'veg' },
  { name: 'Mixed Fruit Salad', category: 'Salads', price: '₹199', popular: true, type: 'veg' },
  { name: 'Russian Salad', category: 'Salads', price: '₹199', popular: true, type: 'veg' },
  { name: 'Greek Salad', category: 'Salads', price: '₹180', popular: false, type: 'veg' },
  { name: 'Arabic Salad', category: 'Salads', price: '₹169', popular: false, type: 'veg' },

  // Desserts
  { name: 'Gulab Jamun (2pcs)', category: 'Desserts', price: '₹50', popular: true, type: 'veg' },
  { name: 'Dry Fruit Kheer', category: 'Desserts', price: '₹149', popular: true, type: 'veg' },
  { name: 'Gajar Ka Halwa', category: 'Desserts', price: '₹109', popular: true, type: 'veg' },
  { name: 'Moong Dal Halwa', category: 'Desserts', price: '₹99', popular: false, type: 'veg' },
  { name: 'Churma Ladoo', category: 'Desserts', price: '₹50', popular: false, type: 'veg' },
  { name: 'Mawa Chori', category: 'Desserts', price: '₹40', popular: false, type: 'veg' },
  { name: 'Cham Cham', category: 'Desserts', price: '₹30', popular: false, type: 'veg' },
  { name: 'Icecream', category: 'Desserts', price: '₹69', popular: true, type: 'veg' },
];

export default function Menu() {
  const { userProfile, updateProfile, user, login } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isOrderPanelOpen, setIsOrderPanelOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'selection' | 'details' | 'success'>('selection');
  const [showLocationWarning, setShowLocationWarning] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [saveDetails, setSaveDetails] = useState(true);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.fullName && !customerName) setCustomerName(userProfile.fullName);
      if (userProfile.phoneNumber && userProfile.phoneNumber !== '0000000000' && !phone) setPhone(userProfile.phoneNumber);
      if (userProfile.address && !address) setAddress(userProfile.address);
      if (userProfile.mapLink && !mapLink) setMapLink(userProfile.mapLink);
    }
  }, [userProfile]);

  // Location State
  const [isLocating, setIsLocating] = useState(false);
  const [locationErrorType, setLocationErrorType] = useState<'' | 'denied' | 'unavailable' | 'timeout' | 'unsupported'>('');
  const [locationSuccess, setLocationSuccess] = useState(false);

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.split('/')[0].replace(/\D/g, ''), 10);
  };

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'All') {
      items = items.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, searchQuery]);

  const addToOrder = (item: {name: string, price: string, category: string}) => {
    const itemPrice = parsePrice(item.price);
    const eligible = isDiscountEligible(item.category);
    setOrder(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { name: item.name, originalPrice: itemPrice, quantity: 1, isDiscountEligible: eligible }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setOrder(prev => prev.map(i => {
      if (i.name === name) {
        return { ...i, quantity: i.quantity + delta };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorType('unsupported');
      setLocationSuccess(false);
      return;
    }
    
    setIsLocating(true);
    setLocationErrorType('');
    setLocationSuccess(false);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setMapLink(link);
        setIsLocating(false);
        setLocationSuccess(true);
      },
      (error) => {
        setIsLocating(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationErrorType('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationErrorType('unavailable');
            break;
          case error.TIMEOUT:
            setLocationErrorType('timeout');
            break;
          default:
            setLocationErrorType('timeout');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = order.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const discount = order.reduce((acc, item) => {
    if (item.isDiscountEligible) {
      return acc + (Math.round(item.originalPrice * 0.2) * item.quantity);
    }
    return acc;
  }, 0);
  const delivery = 0; // Free Delivery
  const totalBill = subtotal - discount + delivery;
  
  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !phone || !address) {
      alert("Please fill in the required fields (Name, Phone, Address).");
      return;
    }

    if (!mapLink) {
      setShowLocationWarning(true);
      return;
    }

    submitOrder();
  };

  const submitOrder = async () => {
    if (user && saveDetails) {
      try {
        await updateProfile({
          fullName: customerName,
          phoneNumber: phone,
          address: address,
          mapLink: mapLink
        });
      } catch (error) {
        console.error("Failed to save profile", error);
      }
    }

    const orderDetails = order.map(i => {
      const itemPrice = i.isDiscountEligible ? Math.round(i.originalPrice * 0.8) : i.originalPrice;
      return `▪️ ${i.name} x ${i.quantity} (₹${itemPrice * i.quantity})`;
    }).join('\n');
    
    const locationPart = mapLink ? `\n*Location:* ${mapLink}` : `\n*Location:* Not Added\n\nDear guest, agar aapne location add nahi ki hai,\nto please WhatsApp par apni current location share kar dijiye,\ntaaki delivery easily ho sake. 🙏`;

    const text = `Thank you for your order 🙏
*New Order 🍽️*
    
*Name:* ${customerName}
*Phone:* ${phone}

*Items:*
${orderDetails}

*Subtotal:* ₹${subtotal}
*Discount Applied:* -₹${discount}
*Delivery:* Free
*Final Total: ₹${totalBill}*

*Delivery Address:*
${address}${locationPart}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/916398698275?text=${encodedText}`, '_blank');
    
    // Move to success screen
    setCheckoutStep('success');
    setShowLocationWarning(false);
  };

  return (
    <div className="w-full bg-[#f4f4f5] min-h-screen pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        
        {/* Discount Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 mt-2">
          <h3 className="text-red-700 font-bold flex items-center gap-2 text-lg"><span>🔥</span> Flat 20% OFF on Food Items</h3>
          <p className="text-red-600/80 text-xs mt-1 font-medium">No discount on Mocktails, Desserts, Ice Cream, Coffee & Beverages</p>
        </div>

        {/* Header & Search */}
        <div className="bg-white p-4 md:px-6 md:py-8 rounded-b-3xl md:rounded-3xl shadow-sm mb-6 sticky top-16 z-30 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Food Menu</h1>
              <p className="text-gray-500 text-sm mt-1">Select your favorite dishes</p>
            </div>
            
            <div className="relative w-full md:w-72 mt-2 md:mt-0">
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none text-gray-900 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-gray-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filter - Scrollable horizontally on mobile */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mt-6 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-red-200 hover:bg-red-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Layout */}
        <div className="space-y-10 px-2 md:px-0">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No dishes found for "{searchQuery}"
            </div>
          ) : (
            categories.filter(c => c !== 'All').map(category => {
              const categoryItems = filteredItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {categoryItems.map((item) => {
                      const orderedItem = order.find(i => i.name === item.name);
              const eligible = isDiscountEligible(item.category);
              const originalPrice = parsePrice(item.price);
              const discountedPrice = eligible ? Math.round(originalPrice * 0.8) : originalPrice;
              
              return (
                <motion.div
                  layout
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                         <div className={`w-4 h-4 border border-gray-300 flex items-center justify-center rounded-sm shrink-0`}>
                           <div className={`w-2 h-2 rounded-full ${item.type === 'veg' ? 'bg-green-600' : item.type === 'drinks' ? 'bg-blue-500' : 'bg-red-600'}`}></div>
                         </div>
                         <h3 className="text-base font-bold text-gray-900 leading-tight">{item.name}</h3>
                         {item.popular && (
                           <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                             POPULAR
                           </span>
                         )}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">{item.category}</div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex flex-col">
                        {eligible ? (
                          <>
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-900 font-bold text-lg">₹{discountedPrice}</span>
                              <span className="text-gray-400 text-xs line-through">₹{originalPrice}</span>
                            </div>
                            <span className="text-red-600 text-[10px] font-bold mt-0.5">20% OFF</span>
                          </>
                        ) : (
                          <span className="text-gray-900 font-bold text-lg">₹{originalPrice}</span>
                        )}
                      </div>

                      {/* ADD Button or Quantity Controls */}
                      {orderedItem ? (
                        <div className="flex items-center bg-red-50 rounded-lg border border-red-200 p-0.5">
                          <button onClick={() => updateQuantity(item.name, -1)} className="text-red-600 hover:bg-red-100 p-1.5 rounded-md transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-red-600 font-bold w-6 text-center text-sm">
                            {orderedItem.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.name, 1)} className="text-red-600 hover:bg-red-100 p-1.5 rounded-md transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToOrder(item)}
                          className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors px-6 py-2 rounded-lg font-bold text-sm shadow-sm"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
            }
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Floating View Order Strip (Like Zomato) */}
      <AnimatePresence>
        {totalItems > 0 && !isOrderPanelOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 md:px-0 bg-gradient-to-t from-white via-white to-transparent pb-6"
          >
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => { setIsOrderPanelOpen(true); setCheckoutStep('selection'); }}
                className="w-full bg-red-600 text-white rounded-2xl p-4 flex justify-between items-center shadow-[0_8px_30px_rgba(226,55,68,0.4)] hover:bg-red-700 transition-colors"
              >
                <div className="text-left">
                  <div className="text-sm text-red-100 font-medium">
                    {totalItems} ITEM{totalItems > 1 ? 'S' : ''} ADDED
                  </div>
                  <div className="font-bold text-lg flex items-center gap-1">
                    ₹{totalBill}
                  </div>
                </div>
                <div className="font-bold flex items-center gap-2 text-lg">
                  View Order <ChevronUp className="w-5 h-5" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOrderPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOrderPanelOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating Order Panel Bottom Sheet */}
      <AnimatePresence>
        {isOrderPanelOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-50 rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col md:max-w-md md:left-1/2 md:-translate-x-1/2 md:top-auto md:h-auto overflow-hidden border border-gray-200"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-1 bg-white cursor-pointer" onClick={() => setIsOrderPanelOpen(false)}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900">
                {checkoutStep === 'selection' ? 'Order Summary' : 'Checkout Details'}
              </h2>
              <button onClick={() => setIsOrderPanelOpen(false)} className="bg-gray-100 text-gray-600 rounded-full p-1.5 hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-4 hide-scrollbar">
              {checkoutStep === 'selection' ? (
                <>
                  {order.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">You haven't added anything yet.</p>
                      <button 
                        onClick={() => setIsOrderPanelOpen(false)}
                        className="text-red-600 font-bold underline"
                      >
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {order.map(item => (
                          <div key={item.name} className="flex justify-between items-start">
                            <div className="flex items-start gap-2 max-w-[60%]">
                              <div className="w-4 h-4 border border-gray-300 flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                                 <div className="w-2 h-2 rounded-full bg-green-600"></div>
                              </div>
                              <div>
                                <h4 className="text-gray-900 font-semibold text-sm leading-snug">{item.name}</h4>
                                <span className="text-gray-500 text-xs mt-0.5 block">
                                  ₹{item.isDiscountEligible ? Math.round(item.originalPrice * 0.8) : item.originalPrice}
                                  {item.isDiscountEligible && <span className="text-red-500 ml-1 font-semibold">(20% OFF)</span>}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center bg-white border border-red-200 rounded-lg p-0.5 shadow-sm">
                                <button onClick={() => updateQuantity(item.name, -1)} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors">
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-red-600 font-bold w-6 text-center text-sm">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.name, 1)} className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors">
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-gray-900 font-bold text-sm">
                                ₹{(item.isDiscountEligible ? Math.round(item.originalPrice * 0.8) : item.originalPrice) * item.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-dashed border-gray-300 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600 font-medium">
                            <span>Discount (20% on selected items)</span>
                            <span>-₹{discount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Delivery Charge</span>
                          <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                          <span>Final Total</span>
                          <span>₹{totalBill}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : checkoutStep === 'details' ? (
                <form id="whatsapp-order-form" onSubmit={handleWhatsAppOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-400" 
                      placeholder="e.g. Rahul Sharma" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-400" 
                      placeholder="10-digit mobile number" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
                    <textarea 
                      required 
                      rows={2} 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none placeholder:text-gray-400" 
                      placeholder="House No, Street, Area, Landmark"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-red-500" /> Google Maps Link <span className="text-gray-400 font-normal">(Optional)</span>
                      </span>
                    </label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isLocating ? (
                          <span className="w-5 h-5 border-2 border-blue-700/30 border-t-blue-700 rounded-full animate-spin"></span>
                        ) : (
                          <Locate className="w-5 h-5" />
                        )}
                        {isLocating ? 'Locating...' : '📍 Get My Location!'}
                      </button>

                      <div className="relative">
                        <input 
                          type="url" 
                          value={mapLink}
                          onChange={(e) => {
                            setMapLink(e.target.value);
                            setLocationErrorType('');
                            setLocationSuccess(false);
                          }}
                          className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-400" 
                          placeholder="Or paste maps link manually" 
                        />
                      </div>

                      {locationSuccess && (
                        <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Location captured successfully
                        </p>
                      )}

                      {locationErrorType === 'denied' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                          <p className="font-semibold mb-2 flex items-center gap-1">
                            <Lock className="w-4 h-4" /> Location access is blocked
                          </p>
                          <p className="mb-2 text-xs">To enable:</p>
                          <ol className="list-decimal pl-4 space-y-1 mb-3 text-xs">
                            <li>Tap the <strong>lock icon</strong> in your browser's address bar</li>
                            <li>Go to <strong>Site Settings</strong> or <strong>Permissions</strong></li>
                            <li>Allow <strong>Location</strong> access</li>
                            <li>Try detecting your location again</li>
                          </ol>
                          <button
                            type="button"
                            onClick={handleGetLocation}
                            className="text-xs bg-red-100 font-bold hover:bg-red-200 text-red-700 border border-red-200 py-1.5 px-3 rounded-lg flex items-center gap-1"
                          >
                            <RotateCw className="w-3 h-3" /> Try Again
                          </button>
                        </div>
                      )}

                      {locationErrorType === 'unavailable' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 flex flex-col gap-2">
                           <p>Please turn <strong>ON</strong> your phone GPS/location services to continue 📍</p>
                           <button
                            type="button"
                            onClick={handleGetLocation}
                            className="text-xs bg-yellow-100 font-bold self-start hover:bg-yellow-200 text-yellow-800 border border-yellow-200 py-1.5 px-3 rounded-lg flex items-center gap-1"
                          >
                            <RotateCw className="w-3 h-3" /> Try Again
                          </button>
                        </div>
                      )}

                      {(locationErrorType === 'timeout' || locationErrorType === 'unsupported') && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800 flex flex-col gap-2">
                           <p>Unable to detect location. Please try again or enter manually.</p>
                           <button
                            type="button"
                            onClick={handleGetLocation}
                            className="text-xs bg-red-100 font-bold self-start hover:bg-red-200 text-red-700 border border-red-200 py-1.5 px-3 rounded-lg flex items-center gap-1"
                          >
                            <RotateCw className="w-3 h-3" /> Try Again
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 pb-1 space-y-2">
                    {user ? (
                      <div className="flex flex-col gap-1 bg-royal-50 p-3 rounded-lg border border-royal-100">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="save-details"
                            checked={saveDetails}
                            onChange={(e) => setSaveDetails(e.target.checked)}
                            className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                          />
                          <label htmlFor="save-details" className="text-sm font-medium text-gray-800 flex items-center gap-1 cursor-pointer select-none">
                            <Save className="w-4 h-4 text-gray-500" />
                            Save these details for future orders
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 pl-6">
                          Save time on your next order by storing your details securely.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Save className="w-4 h-4 text-gray-400 shrink-0" />
                          <p>Login to save your details for faster checkout next time.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => login()}
                          className="shrink-0 whitespace-nowrap px-4 py-1.5 bg-royal-900 focus:ring-2 focus:ring-royal-500 text-white text-sm font-medium rounded hover:bg-royal-800 transition-colors"
                        >
                          Login to Save
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center py-8 text-center px-2">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Shared!</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    If you haven't already, please complete your order on WhatsApp.
                  </p>
                  
                  {!mapLink && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left w-full shadow-sm">
                      <p className="text-blue-800 font-bold mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Important for Delivery
                      </p>
                      <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                        Dear guest, agar aapne location add nahi ki hai, to please WhatsApp par apni current location share kar dijiye, taaki delivery easily ho sake. 🙏
                      </p>
                      <button 
                        onClick={() => window.open('https://wa.me/916398698275', '_blank')}
                        className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                         <WhatsAppIcon className="w-4 h-4" /> Share Location on WhatsApp
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setOrder([]);
                      setIsOrderPanelOpen(false);
                      setCheckoutStep('selection');
                    }}
                    className="text-gray-600 hover:text-gray-900 font-medium py-3 border border-gray-300 w-full rounded-xl transition-colors mt-2"
                  >
                    Start New Order
                  </button>
                </div>
              )}
            </div>

            {/* Footer Form Action */}
            <div className="bg-white p-4 border-t border-gray-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              {order.length > 0 && (
                checkoutStep === 'selection' ? (
                  <button 
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-red-600 text-white font-bold text-lg rounded-2xl px-4 py-4 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
                  >
                    Select Delivery details
                  </button>
                ) : checkoutStep === 'details' ? (
                  <div className="space-y-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ 
                        boxShadow: ["0px 0px 0px rgba(37, 211, 102, 0)", "0px 0px 20px rgba(37, 211, 102, 0.4)", "0px 0px 0px rgba(37, 211, 102, 0)"] 
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity } 
                      }}
                      type="submit"
                      form="whatsapp-order-form"
                      className="w-full bg-[#25D366] text-white font-bold text-lg rounded-2xl px-4 py-4 hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-6 h-6" /> Place Order on WhatsApp
                    </motion.button>
                    <button 
                      type="button" 
                      onClick={() => setCheckoutStep('selection')} 
                      className="w-full text-gray-500 hover:text-gray-900 font-medium py-2"
                    >
                      Back to Summary
                    </button>
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Missing Location Warning Modal */}
      <AnimatePresence>
        {showLocationWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLocationWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <h3 className="text-xl font-bold text-gray-900">Location Missing</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Sir, you have not added your delivery location. You can still place your order without it.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    submitOrder();
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                   <CheckCircle className="w-5 h-5" /> OK, Continue Order
                </button>
                <button
                  onClick={() => setShowLocationWarning(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                   <MapPin className="w-5 h-5" /> Add Location
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}


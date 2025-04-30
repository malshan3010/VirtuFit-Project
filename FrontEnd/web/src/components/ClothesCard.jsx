import React from 'react';
import { Link } from 'react-router-dom';

const ClothesCard = ({ item }) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
    <div className="relative">
    <img
        src={item.images[0]}
        alt={item.name}
        className="w-65 h-45 object-cover object-center"
      />
      <div>
      {item.inStock 
        ?<span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">In stock</span>
        :<span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of stock</span>
        } 
      </div>
    </div>
      <div clas
      </div>
    </div>
  );
};

export default ClothesCard;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyMakeupData } from '../data/Product'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Productdetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  // Find the product that matches the ID in the URL
  // Note: id from useParams is a string, product.id is a number
  const product = dummyMakeupData.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="p-10 text-center">Product not found!</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="flex-1">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-4">
        <span className="text-orange-600 font-bold uppercase text-sm">
          {product.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 text-lg">{product.description}</p>
        <div className="text-3xl font-bold text-gray-900">
          Rs.{product.price.toFixed(2)}
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-md font-bold hover:bg-orange-700 transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default Productdetail;
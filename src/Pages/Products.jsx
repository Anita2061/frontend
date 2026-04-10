import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../lib/api';

// 1. Dummy Data Array (25 Makeup Items)


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/accounts/products/');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(dummyMakeupData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts(dummyMakeupData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center uppercase tracking-widest">
          Makeup Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((products) => (
            <Link key={products.id} to={`/products/${products.id}`} className="block no-underline group">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={products.image} 
                    alt={products.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col cd">
                  <span className="text-[10px] font-bold text-orange-600 uppercase mb-1">
                    {products.category}
                  </span>
                  
                  <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                    {products.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">
                    {products.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Rs.{products.price.toFixed(2)}
                    </span>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!user) {
                          navigate('/login');
                          return;
                        }
                        await addToCart({
                          productId: products.id,
                          title: products.title,
                          price: products.price,
                          image: products.image,
                          qty: 1,
                        });
                      }}
                      className="bg-orange-600 text-white text-[10px] px-3 py-2 rounded font-semibold hover:bg-orange-700 transition-colors"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

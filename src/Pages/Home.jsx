import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <section className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-4 text-center sm:px-6">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          Welcome back, <span className="text-orange-600">{user.username}</span>!
        </h1>
        <p className="mb-8 max-w-xl text-base text-gray-600 sm:text-lg">
          Ready to explore the latest products and deals?
        </p>
        <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            to="/products"
            className="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Browse Products
          </Link>
          <Link
            to="/orders"
            className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            View Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center sm:px-6">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
        Welcome to <span className="text-orange-600">Shopee</span>
      </h1>
      <p className="mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
        Discover the best deals on the latest products. High quality, fast shipping, and excellent customer service all in one place.
      </p>
      <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <Link
          to="/products"
          className="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Shop Now
        </Link>
        <Link
          to="/about"
          className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-4 pb-8 pt-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-gray-800 pb-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-orange-500">Shopee</h2>
          <p className="leading-relaxed text-gray-400">
            Your one-stop destination for the latest electronics, fashion, and home essentials. Quality products delivered to your door.
          </p>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold">Menu</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="transition hover:text-orange-500">Home</Link></li>
            <li><Link to="/about" className="transition hover:text-orange-500">About</Link></li>
            <li><Link to="/service" className="transition hover:text-orange-500">Our Services</Link></li>
            <li><Link to="/products" className="transition hover:text-orange-500">All Products</Link></li>
            <li><Link to="/contact" className="transition hover:text-orange-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold">Customer Support</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/contact" className="transition hover:text-orange-500">Contact Us</Link></li>
            <li><Link to="/service" className="transition hover:text-orange-500">Shipping Support</Link></li>
            <li><Link to="/service" className="transition hover:text-orange-500">Returns & Refunds</Link></li>
            <li><Link to="/about" className="transition hover:text-orange-500">Store Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold">Stay Updated</h3>
          <p className="mb-4 text-sm text-gray-400">Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md bg-gray-800 px-4 py-2 text-white outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button className="rounded-md bg-orange-600 px-4 py-2 transition hover:bg-orange-700">
              Go
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

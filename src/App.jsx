import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import About from './Pages/About';
import Service from './Pages/Service';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Productdetail from './Component/Productdetail';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import PaymentSuccess from './Pages/Paymentsuccess';

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:id" element={<Productdetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

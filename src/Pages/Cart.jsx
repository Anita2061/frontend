import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../lib/api';

const Cart = () => {
  const { user } = useAuth();
  const { items, clearCart, setItems } = useCart();
  const [selectedItemIds, setSelectedItemIds] = useState([]);
<<<<<<< HEAD
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
=======
  const [paymentMethod, setPaymentMethod] = useState('cod');
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Initialize selection when items load
  useEffect(() => {
    if (items.length > 0 && selectedItemIds.length === 0) {
      setSelectedItemIds(items.map(it => it.productId));
    }
  }, [items]);

  const toggleSelection = (productId) => {
<<<<<<< HEAD
    setSelectedItemIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
=======
    setSelectedItemIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
        : [...prev, productId]
    );
  };

  const selectedItems = items.filter(it => selectedItemIds.includes(it.productId));
  const remainingItems = items.filter(it => !selectedItemIds.includes(it.productId));
<<<<<<< HEAD
  
=======
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
  const total = selectedItems.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select at least one item to purchase.");
      return;
    }
    setIsSubmitting(true);

    try {
      if (paymentMethod === 'online') {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/create-esewa-payment/', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ 
            amount: total.toFixed(2),
            items: selectedItems,
            name,
            phone,
            location
          })
        });
        
        const data = await response.json();

        // Clear only selected items before redirecting
        setItems(remainingItems);

=======
        // Call backend to create pending order + get eSewa signature
        const response = await api.post('/accounts/create-esewa-payment/', {
          amount: total.toFixed(2),
          items: selectedItems,
          name,
          phone,
          location
        });

        const data = response.data;

        // Remove purchased items from cart
        setItems(remainingItems);

        // Build and submit eSewa form
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

        const fields = {
          "amount": data.amount,
          "tax_amount": "0",
          "total_amount": data.amount,
          "transaction_uuid": data.transaction_uuid,
          "product_code": data.product_code,
          "product_service_charge": "0",
          "product_delivery_charge": "0",
          "success_url": "http://localhost:5173/payment-success",
          "failure_url": "http://localhost:5173/cart",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "signature": data.signature,
        };

        Object.keys(fields).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

      } else {
<<<<<<< HEAD
        const res = await api.post('/accounts/checkout/', {
          items: selectedItems, name, phone, location, total
        });
        setConfirmedOrder(res.data);
        setOrderConfirmed(true);
        // Remove only selected items
=======
        // Cash on Delivery — POST to checkout
        const res = await api.post('/accounts/checkout/', {
          items: selectedItems,
          name,
          phone,
          location,
          total
        });
        setConfirmedOrder(res.data);
        setOrderConfirmed(true);
        // Remove only selected items from cart
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
        setItems(remainingItems);
      }
    } catch (error) {
      console.error("Order failed:", error);
<<<<<<< HEAD
      alert("Something went wrong. Please try again.");
=======
      const msg = error?.response?.data?.detail || "Something went wrong. Please try again.";
      alert(msg);
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowCheckout(false);
    setOrderConfirmed(false);
    setConfirmedOrder(null);
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">Your cart</h1>
        <p className="text-gray-600">Please <Link className="text-orange-600 font-semibold" to="/login">login</Link> to view cart.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your cart</h1>
        {items.length > 0 && (
<<<<<<< HEAD
          <button 
            onClick={() => { if(window.confirm("Clear all items?")) clearCart(); }}
=======
          <button
            onClick={() => { if (window.confirm("Clear all items?")) clearCart(); }}
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
            className="text-red-500 font-semibold hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white border rounded-lg p-6">Cart is empty.</div>
      ) : (
        <>
          <div className="bg-white border rounded-lg overflow-hidden">
            {items.map((it) => (
              <div key={it.productId} className="flex items-center gap-4 p-4 border-b">
<<<<<<< HEAD
                <input 
                  type="checkbox" 
=======
                <input
                  type="checkbox"
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
                  checked={selectedItemIds.includes(it.productId)}
                  onChange={() => toggleSelection(it.productId)}
                  className="w-5 h-5 accent-orange-600"
                />
<<<<<<< HEAD
                <img src={it.image} alt="" className="w-16 h-16 object-cover" />
=======
                <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
                <div className="flex-1 font-semibold">{it.title} (x{it.qty})</div>
                <div className="font-bold">Rs.{(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center p-5 bg-white border rounded-lg">
            <div>
<<<<<<< HEAD
               <div className="text-xl font-bold">Total: Rs.{total.toFixed(2)}</div>
               <p className="text-sm text-gray-500">{selectedItems.length} items selected</p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)} 
              disabled={selectedItems.length === 0}
              className={`px-8 py-3 rounded-lg font-bold text-white ${selectedItems.length === 0 ? 'bg-gray-400' : 'bg-orange-600'}`}
=======
              <div className="text-xl font-bold">Total: Rs.{total.toFixed(2)}</div>
              <p className="text-sm text-gray-500">{selectedItems.length} items selected</p>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              disabled={selectedItems.length === 0}
              className={`px-8 py-3 rounded-lg font-bold text-white ${selectedItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
            >
              Checkout Selected
            </button>
          </div>
        </>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
            <button onClick={closePopup} className="absolute top-4 right-4 text-2xl">&times;</button>

            {orderConfirmed ? (
<<<<<<< HEAD
               <div className="text-center">
                 <div className="text-5xl mb-4">✅</div>
                 <h2 className="text-2xl font-bold mb-6">Order Confirmed!</h2>
                 <p className="mb-6">Purchased {selectedItems.length} items.</p>
                 <button onClick={closePopup} className="w-full bg-orange-600 text-white py-3 rounded-lg">Return to Store</button>
               </div>
=======
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-6">Order Confirmed!</h2>
                <p className="mb-6">Purchased {selectedItems.length} item(s) for Rs.{total.toFixed(2)}.</p>
                <button onClick={closePopup} className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold">
                  Return to Store
                </button>
              </div>
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
            ) : (
              <form onSubmit={handleProcessOrder} className="space-y-4">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <div className="bg-orange-50 p-3 rounded text-sm text-orange-800 border border-orange-200">
                  You are purchasing <strong>{selectedItems.length}</strong> item(s) for <strong>Rs.{total.toFixed(2)}</strong>.
                </div>
<<<<<<< HEAD
                <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full p-3 border rounded-lg" />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} required className="w-full p-3 border rounded-lg" />
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="font-bold mb-2">Payment Method:</p>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
=======
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Delivery Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="font-bold mb-2">Payment Method:</p>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
                    Online Payment (eSewa)
                  </label>
                </div>

<<<<<<< HEAD
                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold">
=======
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                >
>>>>>>> 0ade13d930a10823aa15e8300847af908b190491
                  {isSubmitting ? 'Processing...' : `Pay Rs.${total.toFixed(2)}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
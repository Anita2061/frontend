import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await api.get('/accounts/orders/');
                setOrders(res.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                <p className="text-gray-600">Please <Link to="/login" className="text-orange-600 font-bold">login</Link> to view your orders.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            
            {orders.length === 0 ? (
                <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
                    <div className="text-5xl mb-4">📦</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't made any purchases yet.</p>
                    <Link to="/products" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Order Placed</p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total</p>
                                        <p className="text-sm font-bold text-gray-900">Rs.{Number(order.total).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Ship To</p>
                                        <p className="text-sm font-semibold text-gray-700">{order.shipping_details?.name || 'Customer'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Order #</p>
                                    <p className="text-[10px] font-mono text-gray-400">{order._id}</p>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-3 h-3 rounded-full ${order.status === 'pending' ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                                    <span className="text-sm font-bold uppercase tracking-wide text-gray-700">{order.status}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 leading-snug">{item.title}</h4>
                                                    <p className="text-sm text-gray-500">Qty: {item.qty} • Rs.{Number(item.price).toFixed(2)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-orange-50 rounded-xl p-4 self-start border border-orange-100">
                                        <h5 className="text-xs font-bold text-orange-800 uppercase mb-2">Delivery Address</h5>
                                        <p className="text-sm text-orange-900">{order.shipping_details?.location}</p>
                                        <p className="text-sm text-orange-900 mt-1 font-medium">{order.shipping_details?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("This is order", orders);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await axios.get('http://localhost:8000/api/orders/order-history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setOrders(response.data);
                console.log(response.data);

            } catch (err) {
                setError('Failed to fetch order history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center">Loading order history...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>

            {orders.length === 0 ? (
                <p className="text-center text-lg">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.orderId} className="border shadow-lg rounded-lg p-5 bg-white">
                            <h2 className="text-2xl font-semibold">Order ID: {order.orderId}</h2>
                            <p className="text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-lg font-medium">Total Price: ₹{order.totalPrice}</p>
                            <p className={`text-sm font-medium 
                                 ${order.deliveryStatus === 'delivered' ? 'text-green-600' :
                                    order.deliveryStatus === 'shipped' ? 'text-blue-600' :
                                        order.deliveryStatus === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`}>
                                Delivery Status: {order.deliveryStatus}
                            </p>

                            <div className="mt-4">
                                <h3 className="text-xl font-medium">Shipping Address:</h3>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-medium">Items:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 border-b py-2">
                                            <img
                                                src={item.productId.image || 'https://via.placeholder.com/64'}
                                                // src={'https://via.placeholder.com/64'}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded shadow"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-gray-600">Quantity: {item.quantity} x {item.price}</p>
                                                    <p className="font-medium text-xl text-gray-900">Per Unit Price: ₹{item.price}</p>
                                                </div>
                                                <p className="font-medium text-lg text-gray-900">
                                                    Total Price: ₹{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;

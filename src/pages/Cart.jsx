import React, { useState } from 'react';
import { useCart } from '../components/Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        zipCode: ''
    });

    const navigate = useNavigate();

    // Calculate total price of items in the cart based on totalPrice * quantity
    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice * item.quantity, 0);

    console.log("total price", totalPrice);


    const handleConfirmOrder = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setShowAddressPopup(true); // Show address input popup
    };

    const handleAddressSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/save-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ address: shippingAddress })
            });

            if (response.ok) {
                console.log('Address saved');
                setShowAddressPopup(false); // Close address popup
                handleCheckout(); // Start the checkout process
            } else {
                console.error('Error saving address');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (orderData) => {
        console.log("Processing payment", orderData);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_Q2Nu73kBCORtIp", // Replace with your Razorpay Key ID
            amount: orderData.order.totalPrice * 100, // Amount in paise
            currency: "INR",
            name: "Laykamp",
            description: "Test Transaction",
            image: "https://your-logo-url.com/logo.png", // Optional
            order_id: orderData.id, // Razorpay Order ID from backend
            handler: async (response) => {
                await updatePaymentStatus(response, orderData);
                alert("Payment successful!");
                clearCart();
            },
            prefill: {
                name: shippingAddress.name,
                email: "customer-email@example.com", // Fetch email dynamically
                contact: "9999999999" // Fetch contact dynamically
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const updatePaymentStatus = async (paymentResponse, orderData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderData.order._id}/payment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    paymentId: paymentResponse.razorpay_payment_id,
                    orderId: orderData.order._id,
                    status: 'paid',
                }),
            });

            if (response.ok) {
                console.log('Payment status updated in the database');
            } else {
                const data = await response.json();
                console.error('Failed to update payment status', data);
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        let finalShippingAddress = shippingAddress;

        if (!finalShippingAddress.name) {
            try {
                const addressResponse = await fetch('http://localhost:8000/api/address/get-address', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (addressResponse.ok) {
                    const { savedAddress } = await addressResponse.json();
                    finalShippingAddress = savedAddress;
                } else {
                    console.error('Error fetching saved address');
                    return;
                }
            } catch (error) {
                console.error('Error fetching saved address:', error);
                return;
            }
        }

        try {
            const response = await fetch('http://localhost:8000/api/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cartItems,
                    shippingAddress: finalShippingAddress,
                    totalPrice  // where this calculated
                })
            });

            const orderData = await response.json();
            if (response.ok) {
                console.log('Checkout successful', orderData);
                handlePayment(orderData);
            } else {
                console.error('Error creating order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="sm:flex shadow-md my-10">
                <div className="w-full sm:w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
                    </div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
                                <div className="md:w-4/12 2xl:w-1/4 w-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full object-center object-cover md:block"
                                    />
                                </div>
                                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Item ID: {item.productId}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                                        <p className="text-base font-black leading-none text-gray-800">
                                            Rs. {item.totalPrice * item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-xs leading-3 text-gray-800">Color: {item.color}</p>
                                    <p className="text-xs leading-3 text-gray-800">Size: {item.size}</p>
                                    <div className="flex items-center justify-between pt-5">
                                        <div className="flex items-center">
                                            <p
                                                className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                                                onClick={() => removeFromCart(item.productId, item.color, item.size)}
                                            >
                                                Remove
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                className="text-xs leading-3 text-gray-800 bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300"
                                                onClick={() => decreaseQuantity(item.productId)}
                                            >
                                                -
                                            </button>
                                            <p className="text-xs leading-3 text-gray-800 mx-3">Qty: {item.quantity}</p>
                                            <button
                                                className="text-xs leading-3 text-gray-800 bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300"
                                                onClick={() => increaseQuantity(item.productId)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div id="summary" className="w-full sm:w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
                        <span className="font-semibold text-sm">Rs. {totalPrice}</span>
                    </div>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Shipping</span>
                        <span className="font-semibold text-sm">Free</span>
                    </div>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Total</span>
                        <span className="font-semibold text-sm">Rs. {totalPrice}</span>
                    </div>
                    <button
                        onClick={handleConfirmOrder}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 w-full mt-5"
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {showAddressPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-2 mb-2 w-full"
                            value={shippingAddress.name}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            className="border p-2 mb-2 w-full"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            className="border p-2 mb-2 w-full"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Zip Code"
                            className="border p-2 mb-2 w-full"
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        />
                        <button
                            onClick={handleAddressSubmit}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 w-full"
                        >
                            Save Address
                        </button>
                        <button
                            onClick={() => setShowAddressPopup(false)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 mt-2 w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

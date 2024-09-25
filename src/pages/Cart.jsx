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

    const navigate = useNavigate()

    const handletestConfirmOrder = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
        // Show the popup when "Confirm Order" is clicked
        setShowAddressPopup(true);
    };

    console.log("cart page", cartItems);



    const handleAddressSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')

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
                setShowAddressPopup(false); // Close the address popup
                console.log("checkout start....");

                // Proceed to checkout
                handleCheckout();

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
        const res = await loadRazorpayScript();
        console.log("start razorpay");
        console.log("order data", orderData);



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
                // Handle successful payment response
                console.log(response);
                await updatePaymentStatus(response, orderData);
                alert("Payment successful!");
                // Store payment ID & update DB

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
        console.log(paymentResponse, orderData);
        console.log("orderid", orderData.order._id);



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
            const data = await response.json();

            if (response.ok) {
                console.log('Payment status updated in the database');
            } else {
                console.error('Failed to update payment status', data);
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };




    const handleCheckout = async () => {
        console.log("fetching token....");

        const token = localStorage.getItem('token');
        console.log("get token....");
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        console.log("this is cart items", cartItems);



        let finalShippingAddress = shippingAddress; // This could be from the address form
        console.log(finalShippingAddress);

        if (!finalShippingAddress) {
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
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        console.log(totalPrice);


        try {
            const response = await fetch('http://localhost:8000/api/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cartItems,
                    shippingAddress: finalShippingAddress, // Use the final address (either new or saved)
                    totalPrice
                })
            });
            const orderData = await response.json(); // Parse the response body
            console.log('order response:', orderData); // Log the entire response for debugging

            if (response.ok) {
                console.log('Checkout successful');
                handlePayment(orderData);
            } else {
                console.error('Error error creating order');
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
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Item ID: {item.id}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                                        <p className="text-base font-black leading-none text-gray-800">
                                            Rs. {item.price * item.quantity}
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
                        <span className="font-semibold text-sm">
                            Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                        <select className="block p-2 text-gray-600 w-full text-sm">
                            <option>Standard shipping - Rs. 100.00</option>
                        </select>
                    </div>
                    <div className="py-10">
                        <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
                            Promo Code
                        </label>
                        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                        Apply
                    </button>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>
                                Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 100}
                            </span>
                        </div>
                        <button
                            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                            onClick={handletestConfirmOrder}
                        >
                            Confirm order
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {showAddressPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Enter Shipping Address</h3>
                        <input
                            type="text"
                            value={shippingAddress.name}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                            placeholder="Name"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            placeholder="Address"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            placeholder="City"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                            placeholder="Zip Code"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleAddressSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowAddressPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

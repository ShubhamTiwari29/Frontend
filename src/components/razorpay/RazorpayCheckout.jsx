// src/components/RazorpayCheckout.js
import React from 'react';

const RazorpayCheckout = ({ amount, email }) => {
    const loadRazorpay = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert('Razorpay SDK failed to load. Are you online?');
        };
        script.onload = async () => {
            try {
                const order = await createOrderOnServer(amount); // Create order on the backend
                const options = {
                    key: 'YOUR_RAZORPAY_KEY', // Enter your Razorpay key ID from Razorpay dashboard
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Your App Name',
                    description: 'Transaction',
                    order_id: order.id,
                    handler: function (response) {
                        alert('Payment successful');
                        console.log(response);
                        // handle payment verification on your server
                        verifyPaymentOnServer(response);
                    },
                    prefill: {
                        email: email,
                    },
                    theme: {
                        color: '#F37254',
                    },
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error('Error loading Razorpay checkout:', error);
            }
        };
        document.body.appendChild(script);
    };

    const createOrderOnServer = async (amount) => {
        // Create an order on your backend and return order details
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });
        return response.json();
    };

    const verifyPaymentOnServer = async (paymentData) => {
        // Verify payment on your server
        const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return response.json();
    };

    return (
        <button onClick={loadRazorpay}>
            Pay Now
        </button>
    );
};

export default RazorpayCheckout;

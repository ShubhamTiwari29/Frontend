import axios from 'axios';






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


const createOrderOnRazorPay = async (receipt, amount, currency) => {
    console.log("Order creation on Razorpay has started");

    try {
        // Send amount and currency in the request body
        const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
            amount,
            currency,
            receipt,
        });
        console.log("Razorpay order data:", orderResponse.data); // Log the response data
        return orderResponse.data; // Return the order data directly

    } catch (error) {
        console.error("Payment Error: ", error);
    }
};

export const handlePayment = async (orderDetails) => {
    console.log("Processing payment for order:", orderDetails);
    const amount = orderDetails.totalPrice;

    // Create order on Razorpay and get the order details
    const razorpayData = await createOrderOnRazorPay(orderDetails._id, amount, "INR");

    console.log("razorpay data", razorpayData);



    if (!razorpayData) {
        alert("Failed to create order on Razorpay");
        return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const options = {
        key: "rzp_test_Q2Nu73kBCORtIp", // Replace with your Razorpay Key ID
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Laykamp",
        description: "Test Transaction",
        image: "https://your-logo-url.com/logo.png", // Optional
        order_id: razorpayData.id, // Use the Razorpay order ID from backend response
        handler: async (response) => {
            // Send payment details to the backend for verification
            const paymentVerificationResponse = await verifyPayment(response, orderDetails._id);
            console.log("payment verificatiob res", paymentVerificationResponse, razorpayData);


            // Conditionally update payment status based on the purpose
            if (orderDetails.purpose === 'forImagePurchase') {
                await updateImagePaymentStatus(razorpayData);


            } else if (orderDetails.purpose === "forFraming") {
                await updatePaymentStatus(razorpayData);
            }

            alert("Payment successful!");
            return { success: true }
            clearCart(); // Clear cart if payment is successful
        },
        prefill: {
            name: orderDetails?.shippingAddress?.name,
            email: "customer-email@example.com", // Fetch email dynamically
            contact: "9999999999", // Fetch contact dynamically
        },
        theme: {
            color: "#61dafb",
        },
    };

    console.log("Razorpay options:", options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};

// Function to verify payment on the backend
const verifyPayment = async (response, orderId) => {
    console.log("verification response sending for verification", response);

    try {
        const verificationResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId, // Optional: you can send the order ID to identify the order in your database
        });

        // return verificationResponse.data.success;

        console.log("Verification response:", verificationResponse);
        if (verificationResponse.data.success) {
            alert("Payment verified successfully! frontend");
            return verificationResponse.data.success;
        } else {
            alert("Payment verification failed. frontend");
            return verificationResponse.data.success;
        }
    } catch (error) {
        console.error("Verification Error:", error);
        alert("Payment verification error. Please contact support.");
    }
};

const updatePaymentStatus = async (razorpayData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${razorpayData.receipt}/payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentId: razorpayData.id,
                orderId: razorpayData.receipt,
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

const updateImagePaymentStatus = async (razorpayData) => {
    const token = localStorage.getItem('token');

    console.log("image updation data", razorpayData.receipt);

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coustmer/Image-billing/paymentStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentId: razorpayData.id,
                orderId: razorpayData.receipt,
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
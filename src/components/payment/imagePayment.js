



const handleBillingPayment = async () => {
    if (validateBillingInfo()) {
        setIsProcessingPayment(true); // Show spinner
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/coustmer/Image-billing`, {
                ...billingInfo,
                productId: product._id, // Pass product ID for payment processing


            });

            console.log("image data saving", response);

            // get totalprice (qty*price) and info of design
            // load payment getway
            // after payment process set other feilds like download image or other feilds

            if (response.data.success) {

                setIsPaymentSuccessful(true);
                setDownloadUrl(response.data.downloadUrl); // Save download link
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            alert('Error processing payment. Please try again later.');
            console.error(error);
        } finally {
            setIsProcessingPayment(false); // Hide spinner
        }
    } else {
        alert("Please fill in all required billing details.");
    }
};
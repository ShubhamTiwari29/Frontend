import React, { useId, useState } from 'react';

import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const CostumerProductForm = () => {
    const [image, setImage] = useState(null);
    const [framesize, setFramesize] = useState('');
    const [framestyle, setFramestyle] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(null);

    const pricing = {
        Small: 500,
        Medium: 1000,
        Large: 1500,
        'Extra Large': 2000,
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const handleFramesizeChange = (e) => {
        const selectedSize = e.target.value;
        setFramesize(selectedSize);
        setPrice(pricing[selectedSize]);
    };

    const navigate = useNavigate();
    const Id = useId();
    const { addToCart } = useCart();

    const uploadImageOnCloud = async () => {
        const formData = new FormData();
        formData.append('image', image);  // Append the selected image file


        try {
            const response = await fetch('http://localhost:8000/api/custemframing/coustem-framing', {
                method: 'POST',
                body: formData,  // Send FormData object
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setMessageType('success');
                console.log(data);
                return data;
                // Redirect after success
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'An error occurred');
                setMessageType('error');
            }
        } catch (err) {
            setMessage('An error occurred while submitting the product');
            setMessageType('error');
        }
        return null;
    };
    const randomProductId = useId();
    const handleAddToCart = async (e) => {
        e.preventDefault();
        const data = await uploadImageOnCloud();
        // Upload the image to the server

        const product = {
            productId: randomProductId,
            name: 'Custom Frame',
            image: data.imageUrl,
            color: framestyle,
            size: framesize,
            price: price * quantity,
            saleprice: price * quantity
        };



        addToCart(product);  // Add the product to the cart
        console.log(product);


        navigate('/cart');
    };

    return (
        <div className="flex flex-col lg:flex-row items-center bg-white my-12 p-8 rounded-lg shadow-lg border border-gray-300">
            <div className="lg:w-1/2 p-8 rounded-lg mb-8 lg:mb-0 lg:mr-8 bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex flex-col justify-center">
                <h1 className="text-5xl font-bold mb-4">Create Your Perfect Frame</h1>
                <p className="text-xl mb-4">Transform your cherished moments into beautifully framed art pieces.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><span className="font-semibold">High-Quality Materials:</span> Choose from a variety of premium frames to suit your style.</li>
                    <li><span className="font-semibold">Multiple Size Options:</span> Available in Small, Medium, Large, and Extra Large sizes.</li>
                    <li><span className="font-semibold">Customizable Styles:</span> Classic, Modern, Vintage – pick a style that matches your decor.</li>
                    <li><span className="font-semibold">Fast Delivery:</span> Receive your custom frame in 2-3 business days.</li>
                </ul>
                <p className="text-lg mb-4 font-semibold">It's never been easier to frame your memories. Start now and add a personal touch to your space!</p>
                <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-transform duration-300 mt-4">
                    Learn More About Our Framing Services
                </button>
            </div>

            <form className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-inner transform hover:scale-105 transition duration-300 ease-in-out" onSubmit={handleAddToCart}>
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Customize Your Frame</h2>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-800 border-2 border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {imagePreview && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreview} alt="Product Preview" className="max-w-full h-40 rounded-lg shadow-md border-2 border-gray-200" />
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Frame Size</label>
                    <select
                        value={framesize}
                        onChange={handleFramesizeChange}
                        className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        required
                    >
                        <option value="" disabled>Select size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Extra Large">Extra Large</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frame Style</label>
                    <select
                        value={framestyle}
                        onChange={(e) => setFramestyle(e.target.value)}
                        className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        required
                    >
                        <option value="" disabled>Select style</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Canvas">Canvas</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        min={1}
                        required
                    />
                </div>
                <div className="mb-6 text-xl font-medium text-gray-800">
                    Total Price: <span className="font-extrabold text-green-600">₹{price * quantity}</span>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-lg hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
                >
                    Add to Cart
                </button>
            </form>
        </div>
    );
};

export default CostumerProductForm;

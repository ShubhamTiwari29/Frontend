import React, { useRef, useEffect } from 'react';
import CostumerProductForm from '../components/CostumerProductForm/CostumerProductForm';
import img1 from '../assets/Images/banner.jpg';
import { useLocation } from 'react-router-dom';

const CustomFraming = () => {
    const formRef = useRef(null); // Step 1: Create a ref for the form

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const location = useLocation();

    useEffect(() => {
        // Check if the state has the scrollToForm flag
        if (location.state && location.state.scrollToForm) {
            scrollToForm();
        }
    }, [location.state]); // Run when location.state changes
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-4 md:py-10">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[36vh] md:h-[50vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${img1})`,
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative text-center text-white">
                    <h1 className="text-3xl md:text-5xl font-bold">Convert Images Into Displays</h1>
                    <p className="mt-4 text-sm md:text-lg">Convert your images into beautiful framed displays.</p>
                    <button className="mt-6 px-6 py-3 bg-yellow-500 rounded-full text-black font-bold md:font-semibold hover:bg-yellow-600"
                        onClick={scrollToForm}
                    >
                        Upload Picture
                    </button>
                </div>
            </div>

            {/* Steps to Order Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-8 md:space-y-0">
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 p-4 rounded-full text-white text-xl font-bold">1</div>
                        <h3 className="mt-4 font-semibold text-lg">Upload Your Picture</h3>
                        <p className="text-gray-500 text-center">Choose the photo you want to frame from your device.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 p-4 rounded-full text-white text-xl font-bold">2</div>
                        <h3 className="mt-4 font-semibold text-lg">Select Frame Style & Size</h3>
                        <p className="text-gray-500 text-center">Pick the frame style and size that suits your decor.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-400 p-4 rounded-full text-white text-xl font-bold">3</div>
                        <h3 className="mt-4 font-semibold text-lg">Place Your Order</h3>
                        <p className="text-gray-500 text-center">Complete your order and we’ll deliver your frame within 2-3 days.</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div ref={formRef} className="w-full container mx-auto px-6 md:px-8 py-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Create Your Custom Frame</h2>
                <CostumerProductForm />
            </div>

            {/* Testimonials or Benefits Section */}
            <div className="bg-blue-50 py-10 mt-16">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="font-semibold text-lg">High-Quality Materials</h3>
                            <p className="text-gray-500 mt-2">We use only the best materials to ensure that your frame lasts for years.</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="font-semibold text-lg">Fast & Secure Delivery</h3>
                            <p className="text-gray-500 mt-2">Get your framed pictures delivered securely and quickly to your doorstep.</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-md">
                            <h3 className="font-semibold text-lg">Affordable Prices</h3>
                            <p className="text-gray-500 mt-2">Enjoy premium frames at unbeatable prices with no hidden costs.</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default CustomFraming;


import React, { useState } from 'react';

const CostumerProductForm = ({ onSubmit }) => {
    const [image, setImage] = useState(null);
    const [framesize, setFramesize] = useState('');
    const [framestyle, setFramestyle] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();



        const product = {
            image: imagePreview,
            framesize,
            framestyle,
            quantity,



        };


        console.log(product);
        setImage(null);
        setFramesize('');
        setFramestyle('');
        setQuantity('');
        setImagePreview(null);
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

    return (
        <>
            <div className='md:flex md:bg-slate-200  my-4 rounded-lg shadow-md'>
                <div className='p-4  w-full justify-center'>
                    <h1 className='font-bold'>Upload File or Custom Design</h1>
                    <p className='pl-2'>Uploade your Image or picture</p>
                    <p className='pl-2'>select frame size</p>
                    <p className='pl-2'>Select Frame style</p>
                    <p className='pl-2'>Get framed Picture in 2-3 Business Days</p>

                </div>
                <form onSubmit={handleSubmit} className=" mx-auto w-full p-4 bg-white rounded-lg ">
                    <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Product Preview" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Frame Size:</label>
                        <select
                            value={framesize}
                            onChange={(e) => setFramesize(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>Select size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Extra Large">Extra Large</option>
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Frame Style:</label>
                        <select
                            value={framestyle}
                            onChange={(e) => setFramestyle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled>Select style</option>
                            <option value="Classic">Black</option>
                            <option value="Modern">White</option>
                            <option value="Vintage">Canvas</option>

                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min={1}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Preview
                    </button>
                </form>
            </div>
        </>
    );
};

export default CostumerProductForm;

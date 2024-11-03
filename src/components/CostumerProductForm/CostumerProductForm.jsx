import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { BsUpload } from "react-icons/bs";

const CustomerProductForm = () => {
    const [image, setImage] = useState(null);
    const [imageMetadata, setImageMetadata] = useState('');
    const [framesize, setFramesize] = useState('');
    const [framestyle, setFramestyle] = useState([]);
    const [selectedFrameId, setSelectedFrameId] = useState();
    const [selectedFrameStyle, setSelectedFrameStyle] = useState('');
    const [frameWidth, setFrameWidth] = useState('');
    const [frameHeight, setFrameHeight] = useState('');
    const [selectedFrameStyleImage, setSelectedFrameStyleImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');  // State to store uploaded image URL
    const [quantity, setQuantity] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFieldsEnabled, setIsFieldsEnabled] = useState(false);
    const [validFrameSizes, setValidFrameSizes] = useState([]);

    console.log("frame Size", framesize);

    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            uploadImageOnCloud(file);
        } else {
            setImage(null);
            setImagePreview(null);
            setIsFieldsEnabled(false);
        }
    };

    const handleFramesizeChange = (e) => {
        const selectedSize = e.target.value;
        setFramesize(selectedSize);
        const [width, height] = selectedSize.split('x');
        setFrameWidth(width.trim());
        setFrameHeight(height.trim());

        calculateTotalPrice(selectedSize, selectedFrameStyle);
    };

    const handleFrameStyleChange = (e) => {
        const selectedFrame = framestyle.find(frame => frame.name === e.target.value);
        setSelectedFrameStyle(e.target.value);
        setSelectedFrameStyleImage(selectedFrame?.image || '');
        calculateTotalPrice(framesize, selectedFrame.name);
    };

    const uploadImageOnCloud = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/customframing/coustom-framing`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setMessageType('success');
                setIsFieldsEnabled(true);

                setValidFrameSizes(data.validFrameSizes);
                setFramestyle(data.frames);
                setIsLoading(false);
                console.log("image all data", data);
                setImageUrl(data.imageUrl)
                setImageMetadata(data)



                return data;
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'An error occurred');
                setMessageType('error');
                setIsLoading(false);
            }
        } catch (err) {
            setMessage('An error occurred while submitting the product');
            setMessageType('error');
            setIsLoading(false);
        }
        return null;
    };
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 6000);

            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, [message]);

    const calculateTotalPrice = (selectedSize, selectedStyle) => {
        const selectedFrame = framestyle.find(frame => frame.name === selectedStyle);

        setSelectedFrameId(selectedFrame._id)
        console.log("selected frame", selectedFrame);


        if (selectedFrame && selectedSize) {
            const { pricePerSquareInch } = selectedFrame;
            const [width, height] = selectedSize.split('x').map(Number);

            if (pricePerSquareInch && width && height) {
                const calculatedPrice = pricePerSquareInch * width * height;
                setPrice(calculatedPrice);
            }
        }
    };



    const handleChangeImage = () => {
        setImage(null);
        setImagePreview(null);
        setIsFieldsEnabled(false);
    };


    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            // Prepare the payload according to the backend requirements
            const payload = {
                // userId: localStorage.getItem('customerId'),  // Assuming the customer ID is stored in localStorage
                image: imageMetadata.imageUrl,  // The path or URL to the uploaded image
                imageWidth: imageMetadata.imageWidth,  // You can set this dynamically based on the image or frame size
                imageHeight: imageMetadata.imageHeight,  // You can set this dynamically as well
                title: "Coustom Image",  // Set this as per the product or allow input for title
                price: price,  // Calculated price
                selectedFrameSize: framesize,  // Selected frame size
                selectedFrameStyle: selectedFrameStyle,  // Selected frame style
                quantity: quantity,  // Selected quantity
                description: "A beautiful landscape photo"  // You can provide a description field in the form
            };

            // Send the data to the backend
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/customframing/coustom-framing/design`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // JWT token for authentication
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const { data } = await response.json(); // destructured here because from backend data is wraped in data use here {},

            console.log("uploaded data", data);

            if (response.ok) {
                setMessage('Product added to cart successfully!');
                setMessageType('success');




                addToCart({
                    productId: data.id,
                    name: data.title,
                    price: data.price,
                    salePrice: data.price,
                    image: data.imageUrl,
                    color: data.frameStyle,
                    frameDesignId: selectedFrameId,
                    width: frameWidth,
                    height: frameHeight,
                    size: framesize,
                    totalPrice: price,
                    source: "customer",

                });
                console.log("frame Size", framesize);


                // addToCart({
                //     productId: product._id,
                //     name: product.title,
                //     price: product.price,
                //     salePrice: product.salePrice,
                //     image: product.image,
                //     color: selectedColor.name,
                //     frameDesignId: selectedColor.id,
                //     width: `${selectedSize.width}`,
                //     height: `${selectedSize.height}`,
                //     size: `${selectedSize.width}x${selectedSize.height}`,
                //     totalPrice: Number(totalPrice),
                // });

                setIsLoading(false);
                // navigate('/cart');  // Navigate to the cart page after adding the product to the cart
            } else {
                setMessage(data.message || 'Error adding product to cart');
                setMessageType('error');
                setIsLoading(false);
            }
        } catch (error) {
            setMessage('An error occurred while adding the product to cart');
            setMessageType('error');
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col-reverse lg:flex-row items-center bg-white my-12 p-2 md:p-8 rounded-lg shadow-lg border border-gray-300">
            <div className="lg:w-1/2 p-8 rounded-lg mb-8 lg:mb-0 lg:mr-8 bg-gradient-to-b from-blue-50 to-white text-black flex flex-col justify-center shadow-lg transition-transform transform max-w-full mx-auto">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-center">Convert Images into Displays</h1>
                <p className="text-lg lg:text-xl mb-6 text-center">Transform your images into beautifully framed displays with our easy-to-follow process:</p>
                <ol className="list-decimal list-inside space-y-4">
                    <li className="flex items-start space-x-3">
                        <span className="text-yellow-400 text-2xl">📸</span>
                        <div>
                            <strong>Upload Your Picture:</strong> Start by uploading the image you want to frame. Ensure it meets the required dimensions for the best results.
                        </div>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="text-yellow-400 text-2xl">📐</span>
                        <div>
                            <strong>Analyze Picture Dimensions:</strong> Once uploaded, our system will automatically analyze the dimensions of your image to determine the optimal frame size.
                        </div>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="text-yellow-400 text-2xl">🖼️</span>
                        <div>
                            <strong>Select Frame Style & Size:</strong> After the analysis, browse our collection of frame styles and sizes. Choose the one that best complements your image and fits your preferences.
                        </div>
                    </li>
                    <li className="flex items-start space-x-3">
                        <span className="text-yellow-400 text-2xl">✔️</span>
                        <div>
                            <strong>Place Your Order:</strong> Review your selections and finalize your order. After placing your order, we’ll handle the rest and create your stunning framed display.
                        </div>
                    </li>
                </ol>
            </div>



            <form className="lg:w-1/2 w-full bg-gray-100 p-2 md:p-6 my-2 rounded-lg shadow-inner" onSubmit={handleAddToCart}>
                {imagePreview && (
                    <div className="mb-4 flex justify-center flex-col items-center">
                        <img src={imagePreview} alt="Product Preview" className="max-w-full h-40 rounded-lg shadow-md border-2 border-gray-200 mb-4" />
                        <button
                            type="button"
                            onClick={handleChangeImage}
                            className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Change Image
                        </button>
                    </div>
                )}

                {!image && (
                    <div className="mb-6 text-center">
                        <p className="text-lg font-medium text-gray-700">Upload your image</p>
                        <label className="mt-2 flex justify-center items-center cursor-pointer py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                            <BsUpload className="mr-2" />
                            Choose Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                required
                            />
                        </label>
                    </div>
                )}


                {message && (
                    <div className={`mt-4 p-4 rounded-lg ${messageType === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {message}
                    </div>
                )}

                {image && (
                    <fieldset disabled={!isFieldsEnabled}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Frame Size</label>
                            <select
                                value={framesize}
                                onChange={handleFramesizeChange}
                                className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                                required
                            >
                                <option value="" disabled>Select size</option>
                                {validFrameSizes.map((size, index) => (
                                    <option key={index} value={`${size.width}x${size.height}`}>
                                        {`${size.width} x ${size.height}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Frame Style</label>
                            <select
                                value={selectedFrameStyle}
                                onChange={handleFrameStyleChange}
                                className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                                required
                            >
                                <option value="" disabled>Select style</option>
                                {framestyle.map((frame, index) => (
                                    <option key={index} value={frame.name}>
                                        {frame.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedFrameStyleImage && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Selected Frame Style Preview</label>
                                <img src={selectedFrameStyleImage} alt="Selected Frame Style" className="w-full h-32 object-contain border-2 border-gray-300 rounded-lg" />
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <input
                                type="text"
                                value={price * quantity}
                                disabled
                                className="block w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Calculating...' : 'Add to Cart'}
                            </button>
                        </div>

                    </fieldset>
                )}
            </form>
        </div>
    );
};

export default CustomerProductForm;

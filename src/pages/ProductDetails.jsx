import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { useCart } from '../components/Context/CartContext';
import ColorDropdown from '../components/ProductDetails/ColorDropdown';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import SizeDropdown from '../components/ProductDetails/SizeDropdown';
import MassonaryComponent from '../components/masonary/Massonary';
import { handlePayment } from '../components/payment/cartPayment';

const ProductDetails = (props) => {
    const { products } = useContext(ShopContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [designer, setDesigner] = useState('');
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState({
        name: 'white',
        imageUrl: '',
        pricePerSquareInch: 0,
    });
    const [isZoomed, setIsZoomed] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [frames, setFrames] = useState([]);
    const [selectedOption, setSelectedOption] = useState('download'); // "download" or "framed"
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Track payment success
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        email: '',
    });
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); // Track payment processing
    const [downloadUrl, setDownloadUrl] = useState(''); // Store download URL after payment

    useEffect(() => {
        const fetchFrames = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/seller/frames`);
                const frameData = response.data;

                console.log("frame data", frameData);


                const processedFrames = frameData.map(frame => ({
                    id: frame._id,
                    name: frame.name,
                    imageUrl: frame.imageUrl,
                    pricePerSquareInch: frame.pricePerSquareInch,
                }));

                setFrames(processedFrames);
                if (processedFrames.length > 0) {
                    setSelectedColor(processedFrames[0]);
                }
            } catch (error) {
                console.error('Error fetching frames:', error);
            }
        };

        fetchFrames();
    }, []);

    const product = products.find(item => item._id === id);

    const similarProducts = products.filter(item => {
        const isDifferentProduct = item._id !== product?._id;
        const hasMatchingTags = product?.tags.some(tag => item.tags.includes(tag));
        const hasMatchingOrientation = item.orientation === product?.orientation;
        const hasMatchingTitleKeywords = product?.title.split(' ').some(keyword =>
            item.title.toLowerCase().includes(keyword.toLowerCase())
        );

        return isDifferentProduct && (hasMatchingTags || hasMatchingOrientation || hasMatchingTitleKeywords);
    });
    useEffect(() => {
        if (product?.designerId) {
            setDesigner({
                firstName: product.designerId.firstName,
                lastName: product.designerId.lastName,
                _id: product.designerId._id,
            });
        }
    }, [product]);


    if (!product) {
        return <div className="text-center text-gray-700">Product not found</div>;
    }

    console.log(product);

    // percent also calculate for frames
    const savingPercentage = (((product.price - product.sellingPrice) / product.price
    ) * 100).toFixed(2);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            alert("Please select a color and size.");
            return;
        }
        const totalPrice = calculateTotalPrice();

        addToCart({
            productId: product._id,
            name: product.title,
            price: product.price,
            salePrice: product.salePrice,
            image: product.image,
            color: selectedColor.name,
            frameDesignId: selectedColor.id,
            width: `${selectedSize.width}`,
            height: `${selectedSize.height}`,
            size: `${selectedSize.width}x${selectedSize.height}`,
            totalPrice: Number(totalPrice),
            source: "designer"
        });
        navigate('/cart');
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsZoomed(true);
    };

    const closeZoom = () => {
        setIsZoomed(false);
        setSelectedImage('');
    };

    // Function to calculate frame price based on selected size and color
    const calculateFramePrice = () => {
        if (selectedSize) {
            const area = selectedSize.width * selectedSize.height;
            const framePrice = area * selectedColor.pricePerSquareInch;
            return framePrice.toFixed(2);
        }
        return 0;
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        const framePrice = parseFloat(calculateFramePrice());
        return (product.sellingPrice + framePrice).toFixed(2);
    };

    // Simulate payment process and fetch download link from backend
    const handleBillingPayment = async () => {
        if (validateBillingInfo()) {
            setIsProcessingPayment(true); // Show spinner
            try {
                const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage

                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/coustmer/Image-billing`,
                    {
                        ...billingInfo,
                        designId: product._id, // Pass product ID for payment processing
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
                        },
                    }
                );



                if (response.data.success) {
                    console.log("data check", response.data);

                    const { order } = response.data;

                    console.log("Order details:", order);

                    // Step 2: Pass order details to handlePayment function
                    const billingStatus = await handlePayment(order);
                    console.log(billingStatus);


                    setIsPaymentSuccessful(true);


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

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    // Validate if billing information is filled
    const validateBillingInfo = () => {
        const { name, address, email } = billingInfo;
        return name.trim() !== '' && address.trim() !== '' && email.trim() !== '';
    };

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image Section */}
                    <div className="md:flex-1">
                        <div className="relative mb-4">
                            <img
                                className={`w-full h-[460px] object-contain rounded-lg border shadow-sm transition-transform ${isZoomed ? 'scale-110' : ''}`}
                                src={selectedImage || product.image}
                                alt={product.title}
                                onClick={() => handleImageClick(product.image)}
                            />
                            {isZoomed && (
                                <div
                                    className="absolute inset-x-0 top-[180px] bottom-0 bg-black bg-opacity-40 flex items-center justify-center"
                                    onClick={closeZoom}
                                >
                                    <div className="relative">
                                        <button
                                            className="absolute top-2 right-2 text-white bg-black bg-opacity-75 rounded-full p-2"
                                            onClick={closeZoom}
                                            aria-label="Close Zoomed Image"
                                        >
                                            ✕
                                        </button>
                                        <img
                                            className="w-[100%] max-w-screen max-h-[calc(100vh-180px)] h-auto object-contain"
                                            src={selectedImage || product.image}
                                            alt="Zoomed"
                                        />
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:flex-1 bg-white shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>

                        <div className="flex items-center mb-4">
                            <div>
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="mx-3 text-lg text-black">Rs. {product.sellingPrice}</span>
                                <span className="text-gray-600 line-through mx-3">Rs. {product.price}</span>
                                <span className="text-green-600 mx-3 text-sm">You Save {savingPercentage}%</span>
                            </div>
                        </div>

                        {/* Image Description Section */}
                        <div className="mb-4">
                            <h2 className="font-bold">Image Description</h2>
                            <div className="p-4 bg-white shadow-md rounded-md text-gray-700">
                                {product.description}
                            </div>
                        </div>
                        {/* Option Selection */}
                        <div className="mb-4">
                            <label className="font-bold">Select Option for Download/ Framed Image:</label>
                            <div className="mt-2">
                                <select
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    className="p-2 border rounded"
                                >
                                    <option value="download">Download Image</option>
                                    <option value="framed">Framed Image</option>
                                </select>
                            </div>
                        </div>


                        {/* Conditionally Render Based on Selected Option */}
                        {selectedOption === "framed" ? (
                            <>
                                {/* Color Selection */}
                                <div className="mb-2">
                                    <span className="font-bold">Select Frame:</span>
                                    <ColorDropdown
                                        colors={frames}
                                        selectedColor={selectedColor}
                                        setSelectedColor={setSelectedColor}
                                    />
                                </div>

                                {/* Size Selection */}
                                <div className="mb-4">
                                    <span className="font-bold">Select Size:</span>
                                    <div className="mt-2">
                                        <SizeDropdown
                                            sizes={product.validFrameSizes} // Pass the sizes prop here
                                            selectedSize={selectedSize}
                                            setSelectedSize={setSelectedSize}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Selected Size: {selectedSize ? `${selectedSize.width}x${selectedSize.height}` : "None"}</p>
                                </div>

                                {/* Display Frame Price */}
                                <p className="text-lg font-bold mt-4">Frame Price: Rs. {calculateFramePrice()}</p>

                                {/* Display Total Price */}
                                <p className="text-lg font-bold mt-2">Total Price: Rs. {calculateTotalPrice()}</p>
                            </>
                        ) : (
                            <p className="text-lg font-bold">Total Price: Rs. {product.price}</p>
                        )}

                        {/* Add to Cart Button */}
                        {selectedOption === "framed" ? (
                            <button
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="mt-4">
                                {/* Billing Info Form */}
                                <div className="mb-4">
                                    <label className="font-bold block mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={billingInfo.name}
                                        onChange={handleBillingChange}
                                        className="p-2 border rounded w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="font-bold block mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={billingInfo.address}
                                        onChange={handleBillingChange}
                                        className="p-2 border rounded w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="font-bold block mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={billingInfo.email}
                                        onChange={handleBillingChange}
                                        className="p-2 border rounded w-full"
                                    />
                                </div>

                                {/* Payment Button */}
                                <button
                                    className={`mt-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 ${isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleBillingPayment}
                                    disabled={isProcessingPayment} // Disable button while processing
                                >
                                    {isProcessingPayment ? 'Processing...' : 'Make Payment'}
                                </button>

                                {/* Show Download Button After Payment */}
                                {isPaymentSuccessful && downloadUrl && (
                                    <div className="mt-4">
                                        <a
                                            href={downloadUrl}
                                            download
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500"
                                        >
                                            Download Image
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-2xl font-bold mb-4">Designer</h1>
                            <div>
                                {/* Check if designer exists before trying to access its properties */}
                                {designer ? (
                                    <p className="text-lg">
                                        Name:
                                        <Link
                                            to={`/designer/${designer._id}`} // Ensure this is defined
                                            className="text-yellow-600 hover:underline ml-2"
                                        >
                                            {designer.firstName} {designer.lastName}
                                        </Link>
                                    </p>
                                ) : (
                                    <p className="text-gray-600">Designer information not available.</p>
                                )}
                                <p className="text-gray-600">Other designer details can go here.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div >

            {/* Similar Products Section */}
            < div className='mx-auto max-w-6xl my-4' >
                <h1>Similar Images</h1>
                <Masonry
                    breakpointCols={{ default: 4, 1300: 3, 1100: 2, 767: 2, 500: 1 }}
                    className="flex animate-slide-fade -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {similarProducts.length > 0 ? (
                        similarProducts.slice(0, 5).map((item) => (
                            <MassonaryComponent
                                key={item._id}
                                item={item}
                                title={item.title}

                            />

                        ))
                    ) : (
                        <p className="text-gray-600">No similar products found.</p>
                    )}
                </Masonry >
            </div >
        </div >
    );
};

export default ProductDetails;

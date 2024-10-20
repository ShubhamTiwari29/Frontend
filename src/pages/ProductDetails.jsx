import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { useCart } from '../components/Context/CartContext';
import Item from '../components/Items/Item';
import ColorDropdown from '../components/ProductDetails/ColorDropdown';
import axios from 'axios';
import SizeDropdown from '../components/ProductDetails/SizeDropdown';

const ProductDetails = () => {
    const { products } = useContext(ShopContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState({
        name: 'white',
        imageUrl: '',
        pricePerSquareInch: 0,
    });
    const [isZoomed, setIsZoomed] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        const fetchFrames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/seller/frames');
                const frameData = response.data;
                console.log("product detail page", frameData);


                const processedFrames = frameData.map(frame => ({
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
    const similarProducts = products.filter(item =>
        item._id !== product?._id && product?.tags.some(tag => item.tags.includes(tag))
    );

    if (!product) {
        return <div className="text-center text-gray-700">Product not found</div>;
    }

    const savingPercentage = (((product.salePrice - product.price) / product.salePrice) * 100).toFixed(2);

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
            size: `${selectedSize.width}x${selectedSize.height}`,
            totalPrice: Number(totalPrice),

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
        return (product.price + framePrice).toFixed(2);
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
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeZoom}>
                                    <img className="w-[90%] h-auto object-contain" src={selectedImage || product.image} alt="Zoomed" />
                                </div>
                            )}
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-700 transition-all"
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:flex-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>

                        <div className="flex items-center mb-4">
                            <div>
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="mx-3 text-lg text-black">Rs. {product.price}</span>
                                <span className="text-gray-600 line-through mx-3">Rs. {product.salePrice}</span>
                                <span className="text-green-600 mx-3 text-sm">You Save {savingPercentage}%</span>
                            </div>
                        </div>

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

                        {/* Total Price */}
                        <p className="text-lg font-bold mt-4">Total Price: Rs. {calculateTotalPrice()}</p>

                        {/* Product Description */}
                        <div className="mb-4">
                            <span className="font-bold">Product Description:</span>
                            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                {product.description || "No description available."}
                            </p>
                        </div>

                        {/* Seller Information */}
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-800">Designer:</h3>
                            <div className="mt-2 text-gray-700">
                                <p>
                                    <strong>Name:</strong>
                                    <span
                                        className="text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => navigate(`/designer/${product.designerId._id}`)}
                                    >
                                        {product.designerId.firstName} {product.designerId.lastName}
                                    </span>
                                </p>
                                <p><strong>Location:</strong> Lucknow</p>
                                <p><strong>Contact:</strong> 123456789</p>
                                <p><strong>Rating:</strong> 5/5</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-4 flex gap-2">
                    {product.thumbnails?.map((thumbnail, index) => (
                        <img
                            key={index}
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-24 h-24 object-cover rounded border cursor-pointer"
                            onClick={() => handleImageClick(thumbnail)}
                        />
                    ))}
                </div>

                {/* Similar Products Section */}
                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-4">Similar Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {similarProducts.map(item => (
                            <Item key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { useCart } from '../components/Context/CartContext';
import Item from '../components/Items/Item';
import ColorDropdown from '../components/ProductDetails/ColorDropdown';
import f1 from '../assets/frames/f1.png';
import f2 from '../assets/frames/f2.png';
import f3 from '../assets/frames/f3.png';

const ProductDetails = () => {
    const { products } = useContext(ShopContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState("(8'x12')");
    const [selectedColor, setSelectedColor] = useState({
        name: 'white',
        imageUrl: f1,
    });
    const [isZoomed, setIsZoomed] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    // Available colors
    const colors = [
        { name: 'white', imageUrl: f1 },
        { name: 'black', imageUrl: f2 },
        { name: 'yellow', imageUrl: f3 },
    ];

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

        addToCart({
            productId: product._id,
            name: product.title,
            price: product.price,
            salePrice: product.salePrice,
            image: product.image,
            color: selectedColor.name,
            size: selectedSize,
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
                                colors={colors}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                            />
                        </div>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <span className="font-bold">Select Size:</span>
                            <div className="mt-2">
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="py-1 px-2 rounded border bg-gray-100 border-gray-300 transition-all"
                                >
                                    {["(8'x12')", "(12'x18')", "(18'x24')", "(20'x30')"].map(size => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Selected Size: {selectedSize}</p>
                        </div>

                        {/* Product Description */}
                        <div className="mb-4">
                            <span className="font-bold">Product Description:</span>
                            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                {product.description || "No description available."}
                            </p>
                        </div>

                        {/* Seller Information */}
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-800">Designer : </h3>
                            <div className="mt-2 text-gray-700">
                                <p>
                                    <strong>Name:</strong>
                                    <span
                                        className="text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => navigate(`/designer/${product.designerId._id}`)} // Change this to the correct path for the seller's store
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {similarProducts.slice(0, 4).map((item, i) => (
                            <Item
                                key={i}
                                id={item._id}
                                name={item.title}
                                image={item.image}
                                price={item.price}
                                salePrice={item.salePrice}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

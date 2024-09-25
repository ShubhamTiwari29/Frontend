import React, { useContext, useState } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { useNavigate, useParams } from 'react-router-dom';
import Item from '../components/Items/Item';
import { useCart } from '../components/Context/CartContext';

const ProductDetails = () => {
    // Context hook
    const { products } = useContext(ShopContext);
    // Router hooks
    const { id } = useParams();
    const navigate = useNavigate();
    // Cart hook
    const { addToCart } = useCart();

    // State hooks
    const [selectedColor, setSelectedColor] = useState('white');
    const [selectedSize, setSelectedSize] = useState("(8'x12')");

    // Find product and similar products
    const product = products.find(item => item._id === id);
    const similarProduct = products.filter(item =>
        item._id !== product?._id && product?.tags.some(tag => item.tags.includes(tag))
    );

    // Handle case when product is not found
    if (!product) {
        return <div>Product not found</div>;
    }

    // Calculate saving percentage
    const saving = (((product.salePrice - product.price) / product.salePrice) * 100).toFixed(2);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            alert("Please select a color and size.");
            return;
        }

        addToCart({
            productId: product._id,
            name: product.title,
            price: product.price,
            saleprice: product.salePrice,
            image: product.image,
            color: selectedColor,
            size: selectedSize,
        });
        navigate('/cart');
    };

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    {/* Product Image */}
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg border shadow-sm mb-4">
                            <img
                                className="w-auto mx-auto my-auto object-cover"
                                src={product.image}
                                alt="Product Image"
                            />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-full px-2">
                                <button
                                    className="w-full text-black py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                                    onClick={handleAddToCart}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {product.title}
                        </h2>

                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="mx-3">Rs. {product.price}</span>
                                <span className="text-gray-600 line-through mx-3">Rs. {product.salePrice}</span>
                                <span className="text-green-600 mx-3">You Save {saving}%</span>
                            </div>
                            <div>
                                <span className="font-bold">Availability:</span>
                                <span>In Stock</span>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-2">
                            <span className="font-bold">Select Color:</span>
                            <div className="flex gap-2 mt-2">
                                {['white', 'black', 'yellow'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-6 h-6 rounded-full ${selectedColor === color ? 'border-2 border-black' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-2">
                            <span className="font-bold">Select Size:</span>
                            <div className="flex gap-2 mt-2">
                                {["(8'x12')", "(12'x18')", "(18'x24')", "(20'x30')"].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-1 px-2 rounded ${selectedSize === size ? 'bg-gray-200' : 'bg-gray-300'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Description */}
                        <div>
                            <span className="font-bold">Product Description:</span>
                            <p className="text-sm mt-2">
                                {product.description || "No description available."}
                            </p>
                        </div>

                        {/* Seller Details */}
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-800">Seller Information</h3>
                            <div className="mt-2">
                                <p><strong>Name:</strong> shubham Tiwari</p>
                                <p><strong>Location:</strong> lucknow</p>
                                <p><strong>Contact:</strong> 123456789</p>
                                <p><strong>Rating:</strong> 5</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-4">Similar Products</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        {similarProduct.slice(0, 4).map((item, i) => (
                            <Item
                                key={i}
                                id={item._id}
                                name={item.title}
                                image={item.image}
                                price={item.price}
                                saleprice={item.salePrice}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

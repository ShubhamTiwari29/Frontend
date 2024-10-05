import React, { useContext, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { ShopContext } from '../components/Context/ShopContext';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MassonaryComponent from '../components/masonary/Massonary';
import Loading from '../components/loader/Loading';

const Shop = (props) => {
    const { products, loading, error } = useContext(ShopContext); // Get products, loading, and error from context

    const [cart, setCart] = useState([]);
    const [cartMessage, setCartMessage] = useState('');

    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const navigate = useNavigate();

    // Sync filteredProducts with products context whenever products change
    useEffect(() => {
        setFilteredProducts(products); // Set filtered products to all products initially
    }, [products]); // Dependency on products context






    // Function to handle search button click
    const handleSearch = () => {
        const lowerCaseQuery = searchQuery.toLowerCase(); // Convert search query to lower case for case-insensitive search
        // Filter products based on search query matching title or tags
        const results = products.filter((product) =>
            product.title.toLowerCase().includes(lowerCaseQuery) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
        );
        setFilteredProducts(results); // Update filtered products state
    };

    if (loading) {
        return <div><Loading /></div>; // Show loading indicator while fetching products
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if there's an error
    }

    return (
        <div className="container mx-auto p-6 lg:px-8 py-12">
            {/* Header Section */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{props.title || 'Shop Framed Artworks'}</h1>
                <p className="text-gray-600">Beautifully framed images for your home or office!</p>
            </header>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-md flex">
                    <input
                        type="text"
                        value={searchQuery} // Bind input value to state
                        onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                        placeholder="Search framed images"
                        className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch} // Trigger search on button click
                        className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <AiOutlineSearch size={24} />
                    </button>
                </div>
            </div>

            {/* Cart Message */}
            {cartMessage && (
                <div className="mb-4 text-green-500 text-center">
                    {cartMessage}
                </div>
            )}

            {/* Products Collection Section */}
            <Masonry
                breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                className="flex animate-slide-fade -ml-4"
                columnClassName="pl-4 bg-clip-padding"
            >
                {filteredProducts.map((item, i) => (
                    <MassonaryComponent
                        key={i}
                        item={item}
                        title={item.title}
                    />
                ))}
            </Masonry>
        </div>
    );
};

export default Shop;

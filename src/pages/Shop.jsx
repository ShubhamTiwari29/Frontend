import React, { useContext, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { ShopContext } from '../components/Context/ShopContext';
import { AiOutlineSearch } from 'react-icons/ai';
import MassonaryComponent from '../components/masonary/Massonary';
import Loading from '../components/loader/Loading';

const Shop = (props) => {
    const { products, loading, error } = useContext(ShopContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedOrientation, setSelectedOrientation] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const sizes = ['(8\'x12\')', '(12\'x18\')', '(18\'x24\')', '(20\'x30\')'];

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    // Function to filter products based on search query, orientation, and size
    const filterProducts = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        const results = products.filter((product) => {
            const matchesQuery = product.title.toLowerCase().includes(lowerCaseQuery) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)));

            const matchesOrientation = selectedOrientation ? product.orientation === selectedOrientation : true;
            const matchesSize = selectedSize ? product.size === selectedSize : true;

            return matchesQuery && matchesOrientation && matchesSize;
        });

        setFilteredProducts(results);
    };

    // Handle search button click
    const handleSearch = () => {
        filterProducts();
    };

    // Handle key press for the search input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle changes in filters
    const handleOrientationChange = (e) => {
        setSelectedOrientation(e.target.value);
        filterProducts(); // Filter products whenever the orientation changes
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
        filterProducts(); // Filter products whenever the size changes
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{props.title || 'Shop Framed Artworks'}</h1>
                <p className="text-gray-600">Beautifully framed images for your home or office!</p>
            </header>

            {/* Search Bar and Filters */}
            <div className="flex justify-center mb-8 space-x-4">
                <select
                    value={selectedOrientation}
                    onChange={handleOrientationChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="">All Orientations</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                </select>

                <select
                    value={selectedSize}
                    onChange={handleSizeChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="">All Sizes</option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>

                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search framed images"
                        className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute inset-y-0 right-0 bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        <AiOutlineSearch size={24} />
                    </button>
                </div>
            </div>

            {/* Products Collection Section */}
            <Masonry
                breakpointCols={{ default: 5, 1100: 4, 700: 3, 500: 2 }}
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

import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { AiOutlineSearch } from 'react-icons/ai';
import MassonaryComponent from '../components/masonary/Massonary';
import Loading from '../components/loader/Loading';
import { ShopContext } from '../components/Context/ShopContext';

const Shop = (props) => {
    const { products, loading, error, hasMore, loadMoreProducts } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedOrientation, setSelectedOrientation] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const observerRef = useRef(null);

    const filterProducts = () => {
        const searchWords = searchQuery.toLowerCase().split(' ').filter(word => word);

        const results = products.filter((product) => {
            const matchesQuery = searchWords.length === 0 || searchWords.some(word =>
                product.title.toLowerCase().includes(word) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(word)))
            );

            const matchesOrientation = selectedOrientation ? product.orientation === selectedOrientation : true;

            return matchesQuery && matchesOrientation;
        });

        setFilteredProducts(results);
    };

    const handleSearch = () => {
        // Update the search query in the URL
        setSearchParams({ search: searchQuery });
        // Filter products based on the current search query and orientation
        filterProducts();
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleOrientationChange = (e) => setSelectedOrientation(e.target.value);

    // Infinite scrolling logic with IntersectionObserver
    const lastProductRef = useCallback(
        (node) => {
            console.log("ref start");

            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreProducts();  // Trigger the loadMoreProducts function when the element is in view
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading, hasMore, loadMoreProducts]
    );

    // Re-run the filter when orientation changes
    useEffect(() => {
        filterProducts();
    }, [selectedOrientation, products]);

    if (loading && products.length === 0) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-gradient-to-b from-blue-50 to-white py-10'>
            <div className="container mx-auto p-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{props.title || 'Shop Framed Artworks'}</h1>
                    <p className="text-gray-600">Beautifully framed images for your home or office!</p>
                </header>

                {/* Search Bar and Filters */}
                <div className="flex flex-col-reverse md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center mb-8">
                    <select
                        value={selectedOrientation}
                        onChange={handleOrientationChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white shadow-sm"
                    >
                        <option value="">All Orientations</option>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="other">Other</option>
                    </select>

                    <div className="relative w-full lg:max-w-md ">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search framed images"
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white shadow-sm"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute inset-y-0 right-0 mr-3 flex items-center text-gray-500 hover:text-blue-600 transition duration-200"
                        >
                            <AiOutlineSearch size={24} />
                        </button>
                    </div>
                </div>


                {/* Products Collection Section */}
                <Masonry
                    breakpointCols={{ default: 5, 1300: 4, 1100: 3, 767: 2, 500: 1 }}
                    className="flex animate-slide-fade -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {filteredProducts.map((item, i) => (
                        <MassonaryComponent
                            key={i}
                            item={item}
                            title={item.title}
                            ref={i === filteredProducts.length - 1 ? lastProductRef : null}  // Attach ref to the last item
                        />
                    ))}
                </Masonry>

                {/* Optional: A loading spinner during infinite scroll */}
                {loading && <Loading />}
            </div>
        </div>
    );
};

export default Shop;

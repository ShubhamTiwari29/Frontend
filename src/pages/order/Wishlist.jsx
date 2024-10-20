import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/Context/AuthContext';
import Masonry from 'react-masonry-css';
import MassonaryComponent from '../../components/masonary/Massonary'; // Assuming this is the correct path to your Massonary component
import Loading from '../../components/loader/Loading';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [removingId, setRemovingId] = useState(null); // Track which item is being removed

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) return; // If no user, don't fetch

            try {
                const response = await fetch('http://localhost:8000/api/coustmer/wishlist', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch wishlist');
                const data = await response.json();
                setWishlistItems(data.wishlist?.designs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);



    if (loading) return <Loading />;
    if (error) return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
                {wishlistItems.length === 0 && (
                    <p className="text-gray-600">Your wishlist is empty. Start adding your favorite items!</p>
                )}
            </header>

            <Masonry
                breakpointCols={{ default: 5, 1100: 4, 700: 3, 500: 2 }}
                className="flex animate-slide-fade -ml-4"
                columnClassName="pl-4 bg-clip-padding"
            >
                {wishlistItems.map((item) => (
                    <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300">
                        <MassonaryComponent item={item} title={item.title} />

                    </div>
                ))}
            </Masonry>
            {/* Products Collection Section */}

        </div>
    );
};

export default Wishlist;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadImageDisplay from '../components/downloadImage/downloadImageDisplay';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const DownloadImage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchImages = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/coustmer/billing`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setImages(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch images');
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleCollectMore = () => {
        navigate('/art-gallery'); // Navigate to the collect more designs page
    };

    if (loading) return <p className="text-center text-xl">Loading images...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-4xl font-serif font-bold text-center mb-8 text-gray-800">My Prestige Vault</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {images.map((image) => (
                    <DownloadImageDisplay
                        key={image.orderId}
                        imageUrl={image.originalImageUrl}
                        title={image.title}
                        date={image.createdAt}
                        orderId={image.orderId}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleCollectMore} // Use the handleCollectMore function for navigation
                    className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
                >
                    Collect More Designs
                </button>
            </div>
        </div>
    );
};

export default DownloadImage;

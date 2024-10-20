import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loader/Loading';

const DesignerStore = () => {
    const { id } = useParams();
    const [designerData, setDesignerData] = useState({
        profileImage: '',
        coverImage: '',
        firstName: '',
        lastName: '',
        bio: '',
        rating: '',
        images: [],
        skills: [],
        socialLinks: {},
        website: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    // Fetch designer data and images
    useEffect(() => {
        const fetchDesignerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/designer/designer-store/${id}`);
                const designer = response.data.designer;

                const images = response.data.product.map(item => ({
                    id: item._id,
                    url: item.image,
                    title: item.title,
                    price: `$${item.price}`,
                    description: item.description
                }));

                setDesignerData({
                    profileImage: designer.profileImage,
                    coverImage: designer.coverImage,
                    firstName: designer.firstName,
                    lastName: designer.lastName,
                    bio: designer.bio,
                    rating: designer.rating,
                    images,
                    skills: designer.skills || [],
                    socialLinks: designer.socialLinks || {},
                    website: designer.website || ''
                });
            } catch (err) {
                setError('Failed to fetch designer data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDesignerData();
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseLightbox = () => {
        setSelectedImage(null);
    };

    const handleUploadClick = () => {
        navigate("/upload-image");
    };

    return (
        <div className="container mx-auto p-6">
            {loading && <div className="text-center"><Loading /></div>}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* Cover Image Section */}
            <div className="mb-6">
                <img
                    src={designerData.coverImage || 'https://via.placeholder.com/800x300?text=Cover+Image'}
                    alt={designerData.coverImage ? 'Cover Image' : 'Placeholder Cover Image'}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                />
            </div>

            {/* Designer Profile Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-6">
                    <img
                        src={designerData.profileImage || 'https://via.placeholder.com/150?text=Profile+Image'}
                        alt={designerData.profileImage ? 'Designer Profile' : 'Placeholder Profile Image'}
                        className="w-24 h-24 rounded-full border-2 border-accent"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{designerData.firstName} {designerData.lastName}</h2>
                        <p className="text-textSecondary">{designerData.bio || 'No bio available'}</p>
                        <div className="mt-4 flex space-x-4">
                            <div className="text-sm text-gray-500">
                                <strong>Rating:</strong> {designerData.rating || 'N/A'} / 5
                            </div>
                        </div>
                        <div className="mt-4">
                            <strong>Skills:</strong>
                            <ul className="list-disc pl-5">
                                {designerData.skills.map((skill, index) => (
                                    <li key={index} className="text-sm text-gray-700">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Connect with Me</h3>
                <div className="flex space-x-4">
                    {designerData.socialLinks.instagram && (
                        <a href={designerData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Instagram
                        </a>
                    )}
                    {designerData.socialLinks.facebook && (
                        <a href={designerData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Facebook
                        </a>
                    )}
                    {designerData.socialLinks.twitter && (
                        <a href={designerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Twitter
                        </a>
                    )}
                    {designerData.website && (
                        <a href={designerData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Website
                        </a>
                    )}
                </div>
            </div>

            {/* Image Collection Section */}
            <h3 className="text-2xl font-bold mb-4 text-textPrimary">My Collection</h3>

            {designerData.images.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6">
                    <p className="text-lg text-textSecondary mb-4">No designs found. Please upload some designs.</p>
                    <button
                        onClick={handleUploadClick}
                        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-accent transition duration-300"
                    >
                        Upload Designs
                    </button>
                </div>
            ) : (
                <Masonry
                    breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                    className="flex animate-slide-fade -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {designerData.images.map((image) => (
                        <div
                            key={image.id}
                            className="relative group border rounded-lg overflow-hidden shadow-lg cursor-pointer"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                                <h4 className="text-lg font-semibold">{image.title}</h4>
                                <p className="text-sm">{image.description}</p>
                                <p className="mt-2 font-bold">{image.price}</p>
                            </div>
                        </div>
                    ))}
                </Masonry>
            )}

            {/* Lightbox for Full-Size Image View */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={handleCloseLightbox}
                >
                    <div className="relative">
                        <img
                            src={selectedImage.url}
                            alt="Selected Design"
                            className="max-w-full max-h-screen"
                        />
                        <button
                            onClick={handleCloseLightbox}
                            className="absolute top-4 right-4 bg-white text-black rounded-full p-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignerStore;

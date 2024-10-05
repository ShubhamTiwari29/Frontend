import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios'; // Ensure axios is imported
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loader/Loading';

const initialDesignerData = {
    name: "Alex Johnson",
    bio: "An expert in abstract art and modern digital design. Passionate about creating unique and visually stunning designs that speak to the imagination.",
    profileImage: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/600x300",
    rating: 4.8,
    ranking: 12,
    skills: ["Graphic Design", "UI/UX Design", "Illustration"],
    testimonials: [
        { id: 1, text: "Alex's work is exceptional! Highly recommend.", author: "John Doe" },
        { id: 2, text: "A talented designer who truly understands client needs.", author: "Jane Smith" },
    ],
    projects: [
        { id: 1, title: "Modern App Design", url: "https://via.placeholder.com/400x300" },
        { id: 2, title: "Branding Project", url: "https://via.placeholder.com/300x400" },
        { id: 3, title: "Website Redesign", url: "https://via.placeholder.com/400x300" },
    ],
    images: [], // Initially empty
};

const DesignerStore = () => {
    const { id } = useParams();
    const [designerData, setDesignerData] = useState(initialDesignerData);
    const [designer, setDesigner] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log(id);


    useEffect(() => {
        const fetchOrders = async () => {


            try {
                const response = await axios.get(`http://localhost:8000/api/designer/designer-store/${id}`);


                console.log("this is designer store data", response.data);
                const designer = response.data.designer;
                // Assuming the response.data is an array of images
                const images = response.data.product.map(item => ({
                    id: item._id,
                    url: item.image,
                    orientation: item.orientation,
                    title: item.title,
                    price: `$${item.price}`,
                    description: item.description
                }));

                setDesignerData(prevState => ({
                    ...prevState,
                    images, // Update images array
                }));
                setDesigner(designer)
                console.log(response.data.designer.profileImage);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleImageClick = (images) => {
        console.log("image clicked");

        navigate(`/shop/${images.id}`);
    };

    const handleCloseLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="container mx-auto p-6">
            {loading && <div className="text-center"><Loading /></div>}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* Cover Image Section */}
            <div className="mb-6">
                <img
                    src={designer.profileImage}
                    alt="Cover"
                    className="w-full h-60 object-cover rounded-lg mb-4"
                />
            </div>

            {/* Designer Profile Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-6">
                    <img
                        src={designer.profileImage}
                        alt="Designer"
                        className="w-24 h-24 rounded-full" />
                    <div>
                        <h2 className="text-3xl font-bold">{designer.firstName} {designer.lastName && designer.lastName}</h2>
                        <p className="text-gray-600">{designerData.bio}</p>
                        <div className="mt-4 flex space-x-4">
                            <div className="text-sm text-gray-500">
                                <strong>Rating:</strong> {designerData.rating} / 5
                            </div>
                            <div className="text-sm text-gray-500">
                                <strong>Ranking:</strong> #{designerData.ranking}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4">Testimonials</h3>
                {designerData.testimonials.map((testimonial) => (
                    <blockquote key={testimonial.id} className="mb-4">
                        <p className="text-gray-600 italic">"{testimonial.text}"</p>
                        <footer className="text-gray-500">— {testimonial.author}</footer>
                    </blockquote>
                ))}
            </div>

            {/* Image Collection Section */}
            <h3 className="text-2xl font-bold mb-4">My Collection</h3>
            <Masonry
                breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                className="flex animate-slide-fade"
                columnClassName="bg-green"
            >
                {designerData.images.map((image) => (
                    <div
                        key={image.id}
                        className="relative group border rounded-lg overflow-hidden shadow-md cursor-pointer"
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

            {/* Lightbox for Full-Size Image View */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={handleCloseLightbox}
                >
                    <div className="relative">
                        <img
                            src={selectedImage.url}
                            alt="Selected"
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

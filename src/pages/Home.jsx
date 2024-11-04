import React, { useContext } from 'react';
import img1 from '../assets/Images/BannerHome.jpg';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { FaCamera } from "react-icons/fa";
import { MdOutlineCollections } from "react-icons/md";
import Button from '../components/Button/Button';

const Home = () => {
  const { topViewedProducts } = useContext(ShopContext);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'John Doe',
      review: 'The frame I ordered for my picture was perfect! Highly recommend.',
      image: '/images/customer1.jpg',
    },
    {
      name: 'Jane Smith',
      review: 'Fantastic service and quality. The collection of images is stunning!',
      image: '/images/customer2.jpg',
    },
    // Add more testimonials as needed
  ];

  const handleCustomerUploading = () => {
    navigate('/custom-framing', { state: { scrollToForm: true } });
  };

  const handleImageGallery = (title = '') => {
    navigate(`/art-gallery?search=${title}`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-10">

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold shadow-md">Photo Frames & Digital Art</h1>
          <p className="text-white mt-2 md:text-lg">High-quality framing solutions tailored to your style</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">

            <Button onClick={handleCustomerUploading} icon={<FaCamera />} >
              Upload Picture
            </Button>
            <Button onClick={() => handleImageGallery('')} icon={<MdOutlineCollections />} >
              Image Collection
            </Button>

          </div>
        </div>
      </section >

      {/* Image Collection Section */}
      < section className="py-8 bg-white" >
        <h2 className="text-center text-3xl font-bold mb-6">Our Image Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {topViewedProducts.map((image) => (
            <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img src={image.image} alt={image.title} className="w-full h-auto md:h-72 object-cover rounded-t-lg" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold mt-2">{image.title}</h3>
                <p className="text-md text-gray-700">{image.price}</p>


                <button className="mt-2 bg-[#701728] hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => handleImageGallery(image.title)}
                >
                  Buy & Frame
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="text-yellow-500 hover:underline font-bold py-2 px-4 rounded transition duration-300" onClick={handleImageGallery}>
            See More...
          </button>
        </div>
      </section >

      {/* Why Choose Us Section */}
      < section className="py-8 bg-gray-50 text-center" >
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our frames are handcrafted with precision and care, designed to enhance the beauty of your artwork. We provide a range of customization options, allowing you to create a truly unique piece.
        </p>
      </section >


      {/* Call to Action Section */}
      < section className="py-8 bg-yellow-100 flex flex-col items-center justify-center" >
        <h2 className="text-center text-3xl font-bold mb-6">Ready to Create Your Frame?</h2>
        <button className="bg-[#701728] hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300" onClick={handleCustomerUploading}>
          Start Framing Now!
        </button>
      </section >
    </div >
  );
};

export default Home;

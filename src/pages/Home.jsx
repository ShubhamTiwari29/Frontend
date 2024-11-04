import React, { useContext, useState } from 'react';
import img1 from '../assets/Images/BannerHome.jpg';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import { FaCamera } from "react-icons/fa";
import { MdOutlineCollections } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Button from '../components/Button/Button';
import FAQ from '../components/faq/FAQ';

const Home = () => {
  const { topViewedProducts } = useContext(ShopContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');

  const handleCustomerUploading = () => {
    navigate('/custom-framing', { state: { scrollToForm: true } });
  };

  const handleImageGallery = (title = '') => {
    navigate(`/art-gallery?search=${title}`);
  };

  const handleSearchSubmit = () => {
    handleImageGallery(searchInput);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white md:py-10">
      <div className='md:hidden w-full sm:w-2/3 rounded-lg p-2'>
        <div className="flex items-center">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search images..."
            className="mb-0 w-full  rounded-l-lg rounded-r-none p-2 text-black"
            style={{ height: '40px' }} // Keep consistent height
          />
          <button
            onClick={handleSearchSubmit}
            className=" h-10 px-6 flex items-center justify-center rounded-r-lg rounded-l-none bg-[#701728] hover:bg-[#4c101b] text-white" // Add your styles here
            style={{ height: '40px' }} // Ensure button height matches the input
          >
            <FaSearch />
          </button>
        </div>
      </div>


      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-35"
        style={{ backgroundImage: `url(${img1})` }}
      >

        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold shadow-md">Photo Frames & Digital Art</h1>
          <p className="text-white mt-2 md:text-lg">High-quality framing solutions tailored to your style</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Button onClick={handleCustomerUploading} icon={<FaCamera />}>
              Upload Picture
            </Button>
            <Button onClick={() => handleImageGallery('')} icon={<MdOutlineCollections />}>
              Image Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Image Collection Section */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">Our Image Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {topViewedProducts.map((image) => (
            <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <img src={image.image} alt={image.title} className="w-full h-auto md:h-72 object-cover rounded-t-lg" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold mt-2">{image.title}</h3>
                <div className="flex flex-row justify-center space-x-4">
                  <p className="text-sm">Price: ₹{image.sellingPrice}</p>
                  <p className="text-sm text-red-300 line-through">₹{image.price}</p>
                </div>
                <button
                  className="mt-2 bg-[#701728] hover:bg-[#4c101b] text-white font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => handleImageGallery(image.title)}
                >
                  Buy & Frame
                </button>
              </div>
            </div>

          ))}
        </div>
        <div className="text-center mt-6">
          <button
            className="text-yellow-500 hover:underline font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => handleImageGallery()}
          >
            See More...
          </button>
        </div>
      </section>

      {/* Why Choose Us Section
      <section className="py-8 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our frames are handcrafted with precision and care, designed to enhance the beauty of your artwork. We provide a range of customization options, allowing you to create a truly unique piece.
        </p>
      </section> */}

      {/* FAQ Section */}
      <section className='bg-blue-50 py-8'>
        <FAQ />
      </section>

    </div >
  );
};

export default Home;

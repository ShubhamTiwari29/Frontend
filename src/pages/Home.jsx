import React, { useContext } from 'react';
import img1 from '../assets/Images/BannerHome.jpg';

import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';

const Home = () => {

  const { topViewedProducts } = useContext(ShopContext)

  console.log("top products", topViewedProducts);

  // Sample image collection and testimonials
  // const topViewedProducts = [
  //   { id: 1, title: 'Girl', price: '$29.99', image: '/images/sunset.jpg' },
  //   { id: 2, title: 'Mountain', price: '$39.99', image: '/images/mountain.jpg' },
  //   { id: 3, title: 'Ocean View', price: '$34.99', image: '/images/ocean.jpg' },
  //   // Add more images as needed
  // ];

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

  const navigate = useNavigate();
  const handleCustomerUploading = () => {
    navigate('/custom-framing', { state: { scrollToForm: true } });
  };
  const handleImageGallery = (title = '') => {
    navigate(`/art-gallery?search=${title}`);
  };


  return (
    <div className='bg-gradient-to-b from-blue-50 to-white py-10'>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[40vh] md:h-[50vh]" style={{ backgroundImage: `url(${img1})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-white text-2xl md:text-5xl font-bold shadow-md">Custom Frames Made Just for You!</h1>
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300" onClick={handleCustomerUploading}>
              Upload Your Picture
            </button>
            <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300" onClick={() => handleImageGallery('')}>
              Explore Image Collection
            </button>
          </div>
        </div>
      </section>

      {/* Image Collection Section */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">Our Image Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {topViewedProducts.map((image) => (
            <div key={image.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img src={image.image} alt={image.title} className="w-full h-auto md:h-72 object-cover rounded-t-lg" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold mt-2">{image.title}</h3>
                <p className="text-md text-gray-700">{image.price}</p>
                <button className="mt-2 bg-yellow-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => handleImageGallery(image.title)}

                >
                  Buy & Frame
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* See More Link */}
        <div className="text-center mt-6">
          <button
            className=" text-yellow-500 hover:underline font-bold py-2 px-4 rounded transition duration-300"
            onClick={handleImageGallery} // Make sure to import useNavigate from 'react-router-dom' at the top
          >
            See More...
          </button>
        </div>
      </section >


      {/* Testimonials Section */}
      < section className="py-8 bg-gray-50" >
        <h2 className="text-center text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-col items-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:justify-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center max-w-xs">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-yellow-500" />
              <p className="italic text-gray-600">"{testimonial.review}"</p>
              <h4 className="font-bold mt-2 text-lg">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section >

      {/* Call to Action Section */}
      < section className="py-8 bg-yellow-100 flex flex-col items-center justify-center" >
        <h2 className="text-center text-3xl font-bold mb-6">Ready to Create Your Frame?</h2>
        <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300" onClick={handleCustomerUploading}>
          Start Framing Now!
        </button>
      </section >

    </div >
  );
};

export default Home;

import React from 'react';
import img1 from '../assets/Images/Background.jpg';
import img2 from '../assets/Images/Featured1.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Sample image collection and testimonials
  const imageCollection = [
    { id: 1, title: 'Sunset', price: '$29.99', image: '/images/sunset.jpg' },
    { id: 2, title: 'Mountain', price: '$39.99', image: '/images/mountain.jpg' },
    { id: 3, title: 'Ocean View', price: '$34.99', image: '/images/ocean.jpg' },
    // Add more images as needed
  ];

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
  const navigate = useNavigate()
  const handleCoustmerUplaoding = () => {
    navigate('/shop/custom-framing')
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar bg-teal-500 p-4 flex justify-between items-center">
        <div className="logo text-white text-2xl font-bold">FrameShop</div>
        <ul className="flex space-x-6 text-white">
          <li className="hover:underline cursor-pointer">Custom Frames</li>
          <li className="hover:underline cursor-pointer">Image Collection</li>
          <li className="hover:underline cursor-pointer">Gifts</li>
          <li className="hover:underline cursor-pointer">Promotions</li>
        </ul>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="p-2 rounded" />
          <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh]" style={{ backgroundImage: `url(${img1})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold">Custom Frames Made Just for You!</h1>
          <div className="mt-6 flex space-x-4">
            <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded"
              onClick={handleCoustmerUplaoding}
            >
              Upload Your Picture
            </button>
            <button className="bg-yellow-500 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded">
              Explore Image Collection
            </button>
          </div>
        </div>
      </section>

      {/* Image Collection Section */}
      <section className="py-8 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">Our Image Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {imageCollection.map((image) => (
            <div key={image.id} className="bg-gray-100 p-4 rounded shadow-md hover:shadow-lg transition-all">
              <img src={img2} alt={image.title} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-bold mt-4">{image.title}</h3>
              <p className="text-lg text-gray-700">{image.price}</p>
              <button className="mt-2 bg-yellow-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded">
                Buy & Frame
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 bg-gray-50">
        <h2 className="text-center text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex justify-center space-x-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md text-center max-w-xs">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <p className="italic">"{testimonial.review}"</p>
              <h4 className="font-bold mt-2">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto flex justify-between">
          <div className="space-y-4">
            <h4 className="font-bold">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="font-bold">Connect with Us</h4>
            <div className="flex space-x-4 justify-center mt-4">
              <a href="#"><img src="/icon-instagram.svg" alt="Instagram" /></a>
              <a href="#"><img src="/icon-facebook.svg" alt="Facebook" /></a>
              <a href="#"><img src="/icon-pinterest.svg" alt="Pinterest" /></a>
            </div>
            <div className="mt-4">
              <input type="email" placeholder="Your email" className="p-2 rounded" />
              <button className="bg-teal-500 text-white p-2 rounded">Sign Up</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

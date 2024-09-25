
import React from 'react';
import { Link } from 'react-router-dom';

import Item from '../components/Items/Item';
import data from '../assets/Frontend_Assets/data';
import CostumerProductForm from '../components/CostumerProductForm/CostumerProductForm';
import img1 from '../assets/Images/Featured1.jpg';
import Background from '../assets/Images/Home.jpg'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className='relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center' style={{ backgroundImage: `url(${Background})` }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10'>
          <h1 className='text-5xl text-white font-bold'>We Frame Emotions Online</h1>
          <p className='text-lg text-white mt-4'>India's Online Photo Framing Store</p>
          <Link to="shop" className='inline-block bg-[#FEBD69] text-black hover:bg-[#e5a357] px-8 py-4 rounded-full text-lg font-semibold mt-8'>
            Shop Now
          </Link>
        </div>
      </div >

      {/* Featured Categories Section */}
      < div className='md:px-20 py-10' >
        <h2 className='text-3xl font-semibold text-center mb-8'>Featured Categories</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300'>
            <img src={Background} alt="" />
            <h3 className='text-xl font-semibold mb-4'>Landscape Frames</h3>
            <Link to="/shop/landscapes" className='text-blue-500 hover:text-blue-700'>Shop Now</Link>
          </div>
          <div className='bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300'>
            <img src={img1} alt="" />
            <h3 className='text-xl font-semibold mb-4'>Portrait Frames</h3>
            <Link to="/shop/portraits" className='text-blue-500 hover:text-blue-700'>Shop Now</Link>
          </div>
          <div className='bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300'>
            <img src={img1} alt="" />
            <h3 className='text-xl font-semibold mb-4'>Customized Photo Frames</h3>
            <Link to="/shop/custom-framing" className='text-blue-500 hover:text-blue-700'>Customize Now</Link>
          </div>
        </div>
      </div >

      {/* Popular Products Section */}
      < div className='md:px-20 py-10 bg-gray-100' >
        <h2 className='text-3xl font-semibold text-center mb-8'>Popular Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {data.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
        <div className='text-center mt-6'>
          <Link to="shop" className="text-blue-500 hover:text-blue-700">View All Products</Link>
        </div>
      </div >

      {/* Customer Testimonials or Highlights Section */}
      < div className='md:px-20 py-10' >
        <h2 className='text-3xl font-semibold text-center mb-8'>What Our Customers Say</h2>
        <div className='flex justify-center'>
          <div className='max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center'>
            <p className='text-gray-600 mb-4'>"Beautiful frames and excellent service! Highly recommend this store for all your framing needs."</p>
            <p className='font-semibold text-blue-500'>- Customer Name</p>
          </div>
        </div>
      </div >

      {/* Customized Frames Section */}
      < div className='md:px-20 py-10 bg-white' >
        <h2 className='text-3xl font-semibold text-center mb-8'>Create Your Customized Photo Frame</h2>
        <CostumerProductForm />
      </div >


    </>
  )
};

export default Home;

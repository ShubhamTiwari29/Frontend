// src/pages/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Item from '../components/Items/Item';
import data from '../assets/Frontend_Assets/data'
import CostumerProductForm from '../components/CostumerProductForm/CostumerProductForm';
import ProductDetails from '../components/ProductDetails/ProductDetails';
// import background from '../assets/Images/Background.jpg'

const Home = () => {
  // const [product, setProduct] = useState(null);

  const handleProductSubmit = (product) => {
    setProduct(product);
  };
  return (
    <>
      <div className=' flex items-center h-[400px]  bg-gradient-to-b from-[#92e7e7] to-stone-200 text-center'>
        <div className='w-full'>
          <h1 className='text-[30px] '>WE FRAME EMOTIONS ONLINE</h1>
          <p className='text-gray-400 py-4'>India's Online Photo Framing Store</p>
          <button className=' text-black  p-3 my-6 rounded-lg bg-[#FEBD69] '> <Link to="shop" className=" text-black hover:text-gray-800">Shop Now</Link></button>
        </div>




      </div>
      <div className='md:px-20'>

        <h1 className='  font-semibold mt-6'> LANDSCAPE</h1>

        <div className='md:grid md:grid-cols-3 md:gap-4 md:container mx-auto xl:container xl:grid-cols-4 '>
          {data.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}

        </div>
        <button ><Link to="shop" className=" text-gray-500 hover:text-black">View all</Link> </button>
      </div>

      <div className='md:px-20'>
        <h1 className='  font-semibold mt-6'> PORTRAIT</h1>

        <div className='md:grid md:grid-cols-3 md:gap-4 md:container mx-auto xl:container xl:grid-cols-4'>
          {data.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}

        </div>
        <button ><Link to="shop" className=" text-gray-500 hover:text-black">View all</Link> </button>
      </div>

      <div className='md:px-20'>
        <h1 className='  font-semibold mt-6'> COSTUMIZE IMAGES</h1>
        <CostumerProductForm />
      </div>
    </>
  )
};

export default Home;

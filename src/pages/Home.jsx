// src/pages/Home.js
import React from 'react';

import Item from '../components/Items/Item';
import data from '../assets/Frontend_Assets/data'
// import background from '../assets/Images/Background.jpg'

const Home = () => {
  return (
    <>
      <div className='flex items-center h-[400px] w-full bg-gradient-to-b from-[#92e7e7] to-stone-200 text-center'>
        <div className='w-full'>
          <h1 className='text-[30px] '>WE FRAME EMOTIONS ONLINE</h1>
          <p className='text-gray-400 py-4'>India's Online Photo Framing Store</p>
          <button className=' text-black p-3 my-6 rounded-lg bg-[#FEBD69] '> BUY NOW</button>
        </div>



      </div>
      <div>
        <h1 className='text-center  font-semibold mt-6'> LANDSCAPE</h1>
        <hr className='w-[50%] mx-auto border-solid mb-6 border-black font-extrabold' />
        <div className=' '>
          {data.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}

        </div>
      </div>

      <div>
        <h1 className='text-center  font-semibold mt-6'> PORTRAIT</h1>
        <hr className='w-[50%] mx-auto border-solid mb-6 border-black font-extrabold' />
        <div className=''>
          {data.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}

        </div>
      </div>
    </>
  )
};

export default Home;

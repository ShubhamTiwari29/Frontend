import React from 'react'
import data from '../assets/Frontend_Assets/data'
import Item from '../components/Items/Item'

const Shop = () => {
    return (
        <div className=''>
            <h1 className='text-center  font-semibold mt-6'>PORTRATE COLLECTIONS</h1>
            <hr className='w-[50%] mx-auto border-solid mb-6 border-black font-extrabold' />
            <div className=' '>
                {data.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Shop

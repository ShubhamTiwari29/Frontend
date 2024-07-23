import React from 'react'
import data from '../assets/Frontend_Assets/all_product'
import Item from '../components/Items/Item'

const Shop = () => {
    const totalProduct = data.length;
    return (
        <div className='md:px-20'>
            <h1 className='text-center  font-semibold mt-6'>PORTRATE COLLECTIONS</h1>
            <hr className='w-[50%] mx-auto border-solid mb-6 border-black font-extrabold' />
            <p className='text-right'>total products - {totalProduct}</p>
            <div className='pb-10 md:grid md:grid-cols-3 md:gap-4 md:container mx-auto xl:container xl:grid-cols-4 '>

                {data.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Shop

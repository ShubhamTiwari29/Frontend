import React, { useContext } from 'react'

import Item from '../components/Items/Item'
import { ShopContext } from '../components/Context/ShopContext'

const Shop = (props) => {

    const { all_product } = useContext(ShopContext);
    const filteredProducts = all_product.filter(product => product.category === props.category);
    const totalProduct = filteredProducts.length;
    return (
        <div className='md:px-20'>
            <h1 className='text-center  font-semibold mt-6'>{props.title}</h1>
            <hr className='w-[50%] mx-auto border-solid mb-6 border-black font-extrabold' />
            <p className='text-right'>total products - {totalProduct}</p>
            <div className='pb-10 md:grid md:grid-cols-3 md:gap-4 md:container mx-auto xl:container xl:grid-cols-4 '>

                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    }
                })}
            </div>
        </div>
    )
}

export default Shop

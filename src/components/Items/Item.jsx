import React from 'react'
import img from '../../assets/Images/Background.jpg'
import { Link } from 'react-router-dom'
const Item = (props) => {
    return (
        <>
            <div className=' ' >
                <div className='my-2 rounded-sm px-2 text-[13px] '>
                    <Link to={`/shop/ ${props.id}`}>
                        <img className='w-full h-auto  ' src={props.image} alt="" /></Link>
                    <div className=' '>
                        <h2 className='  my-2'>{props.name}</h2>
                        <div className='flex gap-10 items-center my-2 mx-2'>
                            <div className='new-price font-medium'>
                                Rs. {props.new_price}
                            </div>
                            <div className='old-price line-through'>
                                Rs. {props.old_price}
                            </div>

                        </div>


                        <button className='bg-[#FEBD69] p-3 rounded-md w-full'>Add to cart</button>
                        <button className='bg-[#FEBD69] p-3 rounded-md w-full'>Details</button>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Item

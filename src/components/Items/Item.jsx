import React from 'react'
import img from '../../assets/Images/Background.jpg'
const Item = (props) => {
    return (
        <>
            <div className=' ' >
                <div className='my-2 rounded-sm px-2 text-[13px] '>
                    <img className='w-full h-auto  ' src={props.image} alt="" />
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item

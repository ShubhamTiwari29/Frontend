import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='border-black shadow-xl'>
                <div className='flex w-[90%] py-2 mx-auto   font-bold font-45 '>
                    <div className='w-[10%] text-center p-3'>Unicorn</div>
                    <ul className='w-[90%] flex justify-between  mx-auto'>
                        <li className=' w-[78%] '><input className='w-full p-3 rounded-3xl bg-[#F7F7F7]' type="text" name="Search something" id="" placeholder='Search semething' /></li>
                        <li className='p-3 mx-auto'>Explore</li>
                        <li className='p-3 mx-auto'>Log in</li>
                        <li className=' mx-auto'><button className='bg-green-400 py-3 px-4 rounded-2xl'>join</button></li>
                        <li className=' mx-auto' > <button className='bg-green-400 py-3 px-4 rounded-2xl'>Upload...</button> </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar

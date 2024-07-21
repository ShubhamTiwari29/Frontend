import React from 'react'

const ContactUs = () => {
    return (
        <div>
            <div className='w-1/2 mx-auto'>
                <div className=' w-[400px] bg-[#f9f8f8] shadow-md mx-auto my-12 text-center py-6 px-12'>
                    <h1>Contact Us</h1>
                    <hr className=' w-[75%] mx-auto border-solid border-black font-extrabold' />
                    <div className='text-left'>
                        <p className='p-1'> <strong>Phone Number-</strong> 123456789</p>
                        <p className='p-1'> <strong>Email Address-</strong> something@gmail.com</p>
                        <p className='p-1'> <strong>Working Hours-</strong> 9AM to 8PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs

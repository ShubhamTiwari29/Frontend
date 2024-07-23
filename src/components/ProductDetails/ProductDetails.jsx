import React, { useState } from 'react'
import img from "../../assets/Frontend_Assets/product_9.png"

const ProductDetails = () => {
    const [isOpenDiscount, setIsOpenDiscount] = useState(false);
    const toggleMenuDiscount = () => {
        setIsOpenDiscount(!isOpenDiscount);
    };

    const [isOpenScale, setIsOpenScale] = useState(false);
    const toggleMenuScale = () => {
        setIsOpenScale(!isOpenScale);
    };

    const [framesize, setFramesize] = useState('');
    const [frameStyle, setFrameStyle] = useState('');
    const [quantity, setQuantity] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();



        const product = {

            framesize,
            frameStyle,

            quantity,



        };


        console.log(product);
        alert("your product submitted")

        setFramesize('');
        setFrameStyle('')

    };
    return (
        <>
            <div className='my-4 md:flex md:container md:mx-auto '>
                <div>
                    <img src={img} alt="" className='w-full h-auto' />
                </div>
                <div className=''>
                    <h1></h1>
                    <form onSubmit={handleSubmit} className="md:max-w-lg  p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                        <p>Rs - 1000.00</p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Frame Size (inches):</label>
                            <input
                                type="radio"
                                onChange={(e) => setFramesize(e.target.value)}
                                id="small" name="framesize" value="small" />
                            <label htmlFor="small" className='pr-4 pl-2'>Small</label>
                            <input
                                type="radio"
                                onChange={(e) => setFramesize(e.target.value)}
                                id="medium" name="framesize" value="mediun" />
                            <label htmlFor="medium" className='pr-4 pl-2'>Medium</label>
                            <input
                                type="radio"
                                onChange={(e) => setFramesize(e.target.value)}
                                id="large" name="framesize" value="large" />
                            <label htmlFor="large " className='pr-4 pl-2'>Large</label>
                            <button type="button" value></button>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Frame Style:</label>

                            <input
                                type="radio"
                                onChange={(e) => setFrameStyle(e.target.value)}
                                id="black" name="frameStyle" value="Black"
                            />
                            <label htmlFor="black" className='pr-4 pl-2'>Black</label>
                            <input
                                type="radio"
                                onChange={(e) => setFrameStyle(e.target.value)}
                                id="white" name="frameStyle" value="White" />
                            <label htmlFor="white" className='pr-4 pl-2'>White</label>
                            <input
                                type="radio"
                                onChange={(e) => setFrameStyle(e.target.value)}
                                id="custom" name="frameStyle" value="Custom" />
                            <label htmlFor="custom" className='pr-4 pl-2'>Custom</label>


                        </div>



                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                min={1}

                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            BUY
                        </button>
                    </form>
                    <button onClick={toggleMenuDiscount}><h1>Discount and Offers</h1></button>
                    {isOpenDiscount && (
                        <p className='text-wrap'>gsdfggasdjfguihreubggvdfghA website (also written as a web site) is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Websites are typically dedicated to a particular topic or purpose, such as news, education, commerce, entertainment, or social media. Hyperlinking between web pages guides the navigation of the site, which often starts with a home page. The most-visited sites are Google, YouTube, and Facebook.

                            All publicly-accessible websites collectively constitute the World Wide Web. There are also private websites that can only be accessed on a private network, such as a company's internal website for its employees. Users can access websites on a range of devices, including desktops, laptops, tablets, and smartphones. The app used on these devices is called a web browser.</p>
                    )}
                    <br />

                    <button onClick={toggleMenuScale}><h1>Scale</h1></button>
                    {isOpenScale && (
                        <p>gsdfggasdjfguihreubggvdfghdsdyusgdufygsfuy</p>
                    )}
                    <br />
                </div>
            </div>
        </>
    )
}

export default ProductDetails

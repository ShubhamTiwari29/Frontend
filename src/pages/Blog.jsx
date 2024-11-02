import React, { useContext, useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import { BlogContext } from '../components/Context/BlogContext';
import Pagination from '../components/Pagination/Pagination';

const Blog = () => {
    const { blogs = [], loading, error } = useContext(BlogContext); // Default to empty array
    const [pageNo, setPageNo] = useState(1);
    const [dataPerPage] = useState(5);
    console.log("this is all blog page", blogs);

    // Calculate indices for pagination
    const firstDataIndex = (pageNo - 1) * dataPerPage;
    const lastDataIndex = pageNo * dataPerPage;

    // Get the blogs to display on the current page
    const currentBlogs = blogs.slice(firstDataIndex, lastDataIndex);

    // Handle pagination navigation
    const increasePage = () => {
        if (pageNo < Math.ceil(blogs.length / dataPerPage)) {
            setPageNo(prevPageNo => prevPageNo + 1);
        }
    };

    const decreasePage = () => {
        if (pageNo > 1) {
            setPageNo(prevPageNo => prevPageNo - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='bg-gradient-to-b from-blue-50 to-white py-10'>
            <div className='m-4 xl:container xl:mx-auto md:mx-14'>
                <div class="bg-white p-8 rounded-lg shadow-lg  mx-auto my-10">
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">How to Pick the Right Frames for Gifts and Home Decor</h1>
                    <p class="text-gray-600 leading-relaxed">
                        Welcome to Your Ultimate Guide for Picking Frames for Every Purpose! Whether you're searching for the perfect frame to make your home feel warm and welcoming or a memorable gift for someone special, this guide covers it all. You'll find easy tips on choosing frames that match different rooms in your home, creating the perfect gallery wall, and even making frames a unique part of your decor. Discover frame styles that elevate your space, learn how to select frame sizes and colors to match your decor, and get ideas for personalizing frames to create meaningful gifts. Dive in and transform your spaces and gifts with the right frames!
                    </p>
                </div>


                {/* Your header and content here */}
                {currentBlogs.map((item) => (
                    <BlogList key={item._id} id={item._id} title={item.title} description={item.content} image={item.image} />
                ))}
                <Pagination
                    itemsPerPage={dataPerPage}
                    totalItems={blogs.length}
                    paginate={setPageNo}
                    currentPage={pageNo}
                    firstData={firstDataIndex + 1}
                    lastData={lastDataIndex}
                    increasePageNo={increasePage}
                    decreasePageNo={decreasePage}
                />
            </div>
        </div>
    );
};

export default Blog;

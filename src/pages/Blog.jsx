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
        <div className='m-4 xl:container xl:mx-auto md:mx-14'>
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
    );
};

export default Blog;

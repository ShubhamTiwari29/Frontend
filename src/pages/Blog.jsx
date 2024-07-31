import React, { useContext, useState } from 'react'
import BlogList from '../components/Blog/BlogList'
import { BlogContext } from '../components/Context/BlogContext'
import Pagination from '../components/Pagination/Pagination'

const Blog = () => {


    const [pageNo, setPageNo] = useState(1);
    const [dataPerPage] = useState(5);

    // const currentPage = (pageNumber) => {
    //     setPageNo(pageNumber);
    // };
    const { BlogData } = useContext(BlogContext);

    const increasePage = () => {
        if (pageNo < Math.ceil(BlogData.length / dataPerPage)) {
            setPageNo(prevPageNo => prevPageNo + 1)
        }
    }

    const decreasePage = () => {
        if (pageNo > 1) {
            setPageNo(prevPageNo => prevPageNo - 1)
        }
    }



    const firstData = (pageNo - 1) * dataPerPage
    const lastData = (pageNo * dataPerPage)

    return (
        <div className='m-4 xl:container xl:mx-auto md:mx-14'>
            <h1 className='text-[18px] text-gray-500'>Picture Guide</h1>
            <h1 className='font-bold xl:text-[50px]  my-2 text-[20px]'>Guides on Choosing and Using Pictures for Home Decor and Gifts</h1>
            <p className='text-gray-600 xl:text-[18px] my-2'>Transform Your Space and Relationships with Thoughtful Picture Selections</p>
            <hr />
            <p className='my-3'>Welcome to Our Blog!

                Hello and welcome to our blog! We are thrilled to have you join us in exploring the exciting world of home decor and thoughtful gifting. At [Your Organization's Name], our passion lies in transforming spaces and creating meaningful connections through the power of pictures. Whether you're here to find inspiration for your living room or the perfect photo gift for a loved one, we're here to guide you every step of the way. Dive in, get inspired, and let's make every picture count!

                Happy decorating and gifting!</p>
            {BlogData.slice(firstData, lastData).map((item, i) => {
                return (<BlogList key={i} id={item.id} title={item.title} description={item.description} />)
            })}

            <Pagination
                itemsPerPage={dataPerPage}
                totalItems={BlogData.length}
                paginate={setPageNo}
                currentPage={pageNo}
                firstData={firstData + 1}
                lastData={lastData}
                increasePageNo={increasePage}
                decreasePageNo={decreasePage}
            />

        </div>
    )
}

export default Blog

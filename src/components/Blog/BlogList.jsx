import React from 'react'
import img from '../../assets/Images/Background.jpg'
import UseMediaQuery from '../useMediaQuery';
import { Link } from 'react-router-dom';

function BlogList(props) {
    const isDesktop = UseMediaQuery('(min-width: 980px)');
    return (
        <div>
            <Link to={`/Blog/ ${props.id}`}>
                <div className='flex bg-white shadow-xl my-3 xl:mx-36 hover:scale-105 hover:ease-in-out transition duration-500 hover:shadow-2xl' >
                    <img className='my-auto h-[100px] w-[150px] md:h-[120px] md:w-[160px] xl:h-[150px] xl:w-[200px]  mr-3' src={img} alt="" />
                    <div className='h-[120px] md:h-auto '>
                        <h1 className='font-bold mt-2 md:text-[18px] xl:text-[18px]'>{props.title}</h1>
                        {isDesktop ? <p className='my-2'>{props.description.slice(0, 100)}...</p> : null}

                        <button className='text-blue-700 my-2'>Read More......</button>

                    </div>

                </div>
            </Link>
        </div>
    )
}

export default BlogList;

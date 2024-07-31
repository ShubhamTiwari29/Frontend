
import React from 'react'

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Pagination = ({ itemsPerPage, totalItems, paginate, firstData, lastData, currentPage, increasePageNo, decreasePageNo }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className=''>
            <nav className='flex justify-between   my-3 xl:mx-36  '>
                <p className='p-6'>Showing <strong>{firstData}</strong> to <strong>{lastData}</strong> of <strong>{totalItems}</strong> results</p>
                <div className='flex'>
                    <button className='p-6' onClick={decreasePageNo}><FaChevronLeft /></button>
                    <ul className='flex'>
                        {pageNumbers.map(number => (
                            <li key={number} className='shadow-lg mx-1 rounded-sm'>
                                <button className={`p-6 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'} hover:bg-blue-300`}
                                    onClick={() => paginate(number)}>{number}</button>

                            </li>

                        ))}
                    </ul>
                    <button className='p-6' onClick={increasePageNo}><FaChevronRight /></button>
                </div>

            </nav>
        </div >
    )
}

export default Pagination;





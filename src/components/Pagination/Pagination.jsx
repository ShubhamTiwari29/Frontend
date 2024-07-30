
import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate, firstData, lastData }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav className='flex'>
                <p className='p-6'>Showing {firstData} to {lastData} of {totalItems} results</p>
                <ul className='flex'>
                    {pageNumbers.map(number => (
                        <li key={number} className=''>
                            <button className='p-6' onClick={() => paginate(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination





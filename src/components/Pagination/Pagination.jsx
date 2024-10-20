import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, increasePageNo, decreasePageNo }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex  sm:flex-row items-center justify-center w-full sm:space-x-6 space-y-4 sm:space-y-0 py-4 px-4">
            <button
                className={`w-full sm:w-auto text-sm px-4 py-2 rounded-full text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                onClick={decreasePageNo}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span className=" text-sm  font-semibold text-gray-800 bg-white px-4 py-2 rounded-full shadow-md">
                {`Page ${currentPage} of ${totalPages}`}
            </span>

            <button
                className={`w-full sm:w-auto text-sm px-4 py-2 rounded-full text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                onClick={increasePageNo}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

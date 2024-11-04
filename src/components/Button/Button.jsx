import React from 'react';


const Button = ({ onClick, children, icon }) => {
    return (
        <button
            className="bg-[#701728] hover:bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300 flex items-center"
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            <span>{children}</span>
        </button>
    );
};

export default Button;

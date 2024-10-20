import React from 'react';

const MassonaryComponent = ({ item, title }) => {
    return (
        <div className="relative group">
            {/* Image container */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <img
                    src={item.image}
                    alt={title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <h3 className="text-white text-lg font-semibold">{title}</h3>
            </div>
        </div>
    );
};

export default MassonaryComponent;

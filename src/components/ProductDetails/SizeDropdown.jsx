import React, { useState } from 'react';

const SizeDropdown = ({ sizes, selectedSize, setSelectedSize }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (size) => {
        setSelectedSize(size);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="w-full p-2 border rounded-md text-gray-800 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="capitalize">{selectedSize ? `${selectedSize.width}x${selectedSize.height}` : 'Select Size'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                    {sizes.map((size) => (
                        <li
                            key={`${size.width}x${size.height}`}
                            onClick={() => handleSelect(size)}
                            className="flex items-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
                        >
                            <span className="capitalize">{`${size.width}x${size.height}`}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SizeDropdown;

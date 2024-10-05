import React, { useState } from 'react';

const ColorDropdown = ({ colors, selectedColor, setSelectedColor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (color) => {
        setSelectedColor(color);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="w-full p-2 border rounded-md text-gray-800 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <img
                        src={selectedColor.imageUrl}
                        alt={selectedColor.name}
                        className="w-6 h-6 rounded-md mr-2"
                    />
                    <span className="capitalize">{selectedColor.name}</span>
                </div>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                    {colors.map((color) => (
                        <li
                            key={color.name}
                            onClick={() => handleSelect(color)}
                            className="flex items-center px-2 py-1 hover:bg-gray-200 cursor-pointer"
                        >
                            <img
                                src={color.imageUrl}
                                alt={color.name}
                                className="w-6 h-6 rounded-md mr-2"
                            />
                            <span className="capitalize">{color.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ColorDropdown;
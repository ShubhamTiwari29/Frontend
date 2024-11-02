import React from 'react';
import { IoMdDownload } from "react-icons/io";

const DownloadImageDisplay = ({ imageUrl, title, date, orderId }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();

            const link = document.createElement('a');
            const fileExtension = imageUrl.split('.').pop();
            link.href = window.URL.createObjectURL(blob);
            link.download = `${title}.${fileExtension}`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="relative">
                <img src={imageUrl} alt={title} className="w-full h-56 object-cover rounded-md shadow-md" />
                <button
                    onClick={handleDownload}
                    className="absolute bottom-2 right-2 px-2 py-2  bg-white text-black text-sm font-semibold rounded-full shadow-lg  transition-colors duration-300 ease-in-out"
                >
                    <IoMdDownload />
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
                <p className="text-sm text-gray-600 mt-1">Date: {formatDate(date)}</p>
                <p className="text-sm text-gray-600">Order ID: {orderId}</p>
            </div>
        </div>
    );
};

export default DownloadImageDisplay;

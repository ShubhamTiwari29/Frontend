import React, { useState } from 'react';
import img from '../../assets/Images/Background.jpg';
import UseMediaQuery from '../useMediaQuery';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { IoIosShareAlt } from "react-icons/io";

function BlogList(props) {
    const isDesktop = UseMediaQuery('(min-width: 980px)');
    const [showShareOptions, setShowShareOptions] = useState(false);

    // Function to sanitize and limit description to 10 words
    const getSanitizedDescription = (description) => {
        const sanitizedDescription = sanitizeHtml(description, {
            allowedTags: [],
            allowedAttributes: {}
        });
        const words = sanitizedDescription.split(' ');
        return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
    };

    // Handle Share Button Click (uses Web Share API if available)
    const handleShare = async () => {
        const shareData = {
            title: props.title,
            text: props.description,
            url: window.location.href // Current page URL
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback to manual options
            setShowShareOptions(!showShareOptions); // Toggle dropdown
        }
    };

    return (
        <div className='flex bg-white shadow-xl my-3  hover:scale-105 hover:ease-in-out transition duration-500 hover:shadow-2xl'>
            <Link to={`/Blog/${props.id}`} className="flex-grow">
                <div className='flex items-center'>
                    <img
                        className='my-auto h-[100px] w-[150px] md:h-[120px] md:w-[160px] xl:h-[150px] xl:w-[200px] mr-3'
                        src={props.image || img}
                        alt=""
                    />
                    <div className='h-[120px] md:h-auto flex-grow'>
                        <h1 className='font-bold mt-2 md:text-[18px] xl:text-[18px]'>{props.title}</h1>
                        {isDesktop ? (
                            <p className='my-2'>{getSanitizedDescription(props.description)}</p>
                        ) : null}
                        <button className='text-blue-700 my-2'>Read More......</button>
                    </div>
                </div>
            </Link>

            {/* Share Button on the same x-axis */}
            <div className="flex items-center mx-4 ">
                <button
                    onClick={handleShare}
                    className="text-black  hover:bg-blue-600  rounded-lg shadow-md"
                >
                    <IoIosShareAlt />
                </button>
            </div>

            {/* Fallback Share Options (shown if Web Share API not supported) */}
            {showShareOptions && (
                <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h4 className="text-gray-800 font-bold mb-2">Share on:</h4>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Check out this blog: ${props.title} - ${window.location.href}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline"
                            >
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(props.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:?subject=${encodeURIComponent(props.title)}&body=Check out this blog: ${window.location.href}`}
                                className="text-red-600 hover:underline"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BlogList;

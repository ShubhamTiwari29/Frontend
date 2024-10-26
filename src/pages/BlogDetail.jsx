import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', author: {}, comments: [], tags: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
                console.log(response.data);

                setBlog(response.data);
                setLoading(false);
            } catch (err) {
                setError("Blog not found");
                setLoading(false);
            }
        };

        const fetchRelatedProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = token ? {
                    headers: { Authorization: `Bearer ${token}` }
                } : {};

                const response = await axios.get(`http://localhost:8000/api/products/related/${id}`, config);
                setRelatedProducts(response.data);
            } catch (err) {
                console.error("Error fetching related products:", err);
            }
        };

        fetchBlogData();
        fetchRelatedProducts();
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    const blogTags = blog.tags || [];
    const sanitizedContent = sanitizeHtml(blog.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            'img': ['src', 'alt']
        }
    });

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            console.log(config);

            const response = await axios.patch(`http://localhost:8000/api/blogs/comment/${id}`,
                { content: comment }, config);
            setBlog((prevBlog) => ({
                ...prevBlog,
                comments: [...prevBlog.comments, response.data.comment],
            }));
            setComment('');
        } catch (err) {
            console.error("Error submitting comment:", err);
        }
    };

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <div className="py-12">
                <div className="container bg-white mx-auto  text-black text-center">
                    <h1 className="text-5xl font-bold mb-4">{blog.title || 'Loading...'}</h1>
                    <div className="bg-white bg-opacity-30 rounded-md p-4 mb-4 shadow-md">
                        <div className="flex items-center justify-center space-x-4">
                            <p>By: {blog.author?.name}</p>
                            <span>•</span>
                            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                            <span>•</span>
                            <p>Views: {blog.views}</p>
                        </div>
                        <div className="flex justify-center space-x-4 mt-2">
                            <a href={`https://twitter.com/share?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Share on Twitter</a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Share on Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 mb-6 md:mb-0">
                        <img src={blog.image || "https://images.unsplash.com/photo-1506157786151-b8491531f063"} alt="Blog Featured" className="rounded-lg shadow-lg mb-6" />
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
                            <form onSubmit={handleCommentSubmit} className="flex flex-col">
                                <textarea
                                    value={comment}
                                    onChange={handleCommentChange}
                                    className="border border-gray-300 rounded-md p-2 mb-2 focus:ring focus:ring-blue-300 transition duration-200"
                                    placeholder="Add a comment..."
                                    rows="4"
                                />
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                                    Submit Comment
                                </button>
                            </form>

                            <h2 className="text-xl font-semibold mt-8 mb-4">Comments</h2>
                            <ul className="list-none">
                                {blog.comments?.length > 0 ? (
                                    blog.comments.map((comment, index) => (
                                        <li key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
                                            <p className="font-semibold">{comment.userName}</p>
                                            <p className="text-gray-600">{comment.comment}</p>
                                            <p className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>No comments available</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 px-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Tags</h2>
                            <ul className="list-none">
                                {blogTags.length > 0 ? (
                                    blogTags.map((tag, index) => (
                                        <li key={index} className="mb-2 text-blue-600 hover:underline">{tag}</li>
                                    ))
                                ) : (
                                    <li>No tags available</li>
                                )}
                            </ul>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Featured Images</h2>
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map((product) => (
                                    <div key={product._id} className="mb-6">
                                        <div className="relative group">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded-md shadow-md transition-transform duration-300 transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white text-black py-2 px-4 rounded-md font-semibold transition-colors duration-200 hover:bg-gray-200">
                                                    View Image
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                                            <p className="text-gray-500 mt-1">${product.price}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No related images available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

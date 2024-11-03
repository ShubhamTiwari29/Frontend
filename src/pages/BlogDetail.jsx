import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', author: {}, comments: [], tags: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
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

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/related/${id}`, config);
                setRelatedProducts(response.data.relatedProducts);
                setRelatedBlogs(response.data.relatedBlogs);
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

            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/blogs/comment/${id}`, { content: comment }, config);
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
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 mb-6">
                        {/* Blog Title and Content */}
                        <div className="bg-white text-black rounded-lg shadow-lg p-6 mb-6">
                            <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
                            <div className="flex items-center justify-center text-gray-600 space-x-2 mb-4">
                                <p className=''>By {blog?.author?.firstName} {blog?.author?.lastName}</p>
                                <span> | </span>
                                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                                <span> | </span>
                                <p>Views: {blog.views}</p>
                            </div>
                            <div className="flex justify-center mb-6">
                                <img src={blog.image || "https://images.unsplash.com/photo-1506157786151-b8491531f063"} alt="Blog Featured" className="rounded-lg shadow-lg border-2 border-gray-200" />
                            </div>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                            {/* Tags Section */}
                            <div className="  p-6 ">

                                <ul className="list-none flex flex-wrap">
                                    {blogTags.length > 0 ? (
                                        blogTags.map((tag, index) => (
                                            <li key={index} className="mb-2 mr-2 bg-yellow-100 text-yellow-600 rounded-full px-3 py-1 text-sm font-medium">
                                                {tag}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No tags available</li>
                                    )}
                                </ul>
                            </div>
                        </div>



                        {/* Comment Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
                            <form onSubmit={handleCommentSubmit} className="flex flex-col mb-4">
                                <textarea
                                    value={comment}
                                    onChange={handleCommentChange}
                                    className="border border-gray-300 rounded-md p-2 mb-2 focus:ring focus:ring-yellow-300 transition duration-200"
                                    placeholder="Add a comment..."
                                    rows="4"
                                />
                                <button type="submit" className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200 shadow-md">
                                    Submit Comment
                                </button>
                            </form>
                            <h2 className="text-xl font-semibold mt-8 mb-4">Comments</h2>
                            <ul className="list-none">
                                {blog.comments?.length > 0 ? (
                                    blog.comments.map((comment, index) => (
                                        <li key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm border-l-4 border-yellow-500">
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

                    {/* Sidebar for Related Blogs and Products */}
                    <div className="w-full md:w-1/4 px-4">
                        {/* Related Blogs Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Top Blogs</h2>
                            {relatedBlogs.length > 0 ? (
                                relatedBlogs.map((relatedBlog, index) => (
                                    <div key={relatedBlog._id} className="flex items-center mb-4">
                                        <span className="text-gray-600 mr-2">{index + 1}.</span>
                                        <img
                                            src={relatedBlog.image}
                                            alt={relatedBlog.title}
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <Link to={`/blog/${relatedBlog._id}`} className="text-yellow-600 hover:underline">
                                                <h3 className="text-lg font-semibold">{relatedBlog.title}</h3>
                                            </Link>
                                            <p className="text-gray-500">
                                                {formatDistanceToNow(new Date(relatedBlog.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No related blogs available.</p>
                            )}
                        </div>

                        {/* Related Products Section */}
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
                                                <Link to={`/products/${product._id}`} className="text-white text-lg font-bold">View Product</Link>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                        <p className="text-gray-500">Price: ₹{product.price}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No featured images available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

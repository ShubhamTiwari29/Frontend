import React, { useContext } from 'react'
import { BlogContext } from '../components/Context/BlogContext';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {

    const { BlogData } = useContext(BlogContext);
    const { id } = useParams();
    const Blog = BlogData.find(item => item.id === parseInt(id))
    console.log(Blog);
    return (
        <div>
            this is Blog detail page


            <p>{Blog.title}</p>

        </div>
    )
}

export default BlogDetail

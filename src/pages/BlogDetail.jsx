import React, { useContext } from 'react'
import { BlogContext } from '../components/Context/BlogContext';
import { ShopContext } from '../components/Context/ShopContext'
import { Link, useParams } from 'react-router-dom';
import Item from '../components/Items/Item';

const BlogDetail = () => {
    const { all_product } = useContext(ShopContext);

    const { BlogData } = useContext(BlogContext);
    const { id } = useParams();
    const Blog = BlogData.find(item => item.id === parseInt(id))
    console.log(Blog);
    const blogTags = Blog.tags;

    const recentPosts = BlogData.filter(item =>
        item.id !== Blog.id && blogTags.some(tag => item.tags.includes(tag))
    );


    // const shopProducts = all_product ? all_product.filter(item =>
    //     blogTags.some(tags => item.tags.includes(tags))
    // ) : [];

    const shopProducts = all_product.filter(item =>
        blogTags.some(tag => item.tags.includes(tag))
    );
    console.log(shopProducts);


    return (
        <div className="flex flex-col">
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{Blog.title}</h1>
                    <p className="text-gray-600">Published on April 4, 2023</p>
                </div>
            </div>
            <div className="bg-white py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 px-4">
                        <img
                            src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                            alt="Blog Featured Image"
                            className="mb-8"
                        />
                        <div className="prose max-w-none">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                facilisi. Sed sit amet feugiat eros, eget eleifend dolor. Proin
                                maximus bibendum felis, id fermentum odio vestibulum id. Sed ac
                                ligula eget dolor consequat tincidunt. Nullam fringilla ipsum et ex
                                lacinia, at bibendum elit posuere. Aliquam eget leo nec nibh mollis
                                consectetur.
                            </p>
                            <p>
                                Suspendisse potenti. Mauris euismod, magna sit amet aliquam dapibus,
                                ex sapien porta nisl, vel auctor orci velit in risus. Fusce gravida
                                bibendum dui, id volutpat felis dignissim a. Duis sagittis, arcu ac
                                convallis bibendum, neque dolor suscipit dolor, non malesuada magna
                                orci a mauris. Proin sollicitudin diam eu enim tincidunt dapibus.
                                Aliquam pharetra purus mauris, id lacinia mi malesuada ut. Integer
                                dignissim, urna nec scelerisque feugiat, lacus sapien tincidunt sem,
                                sed luctus enim libero vel nunc. Vivamus ornare, felis quis feugiat
                                luctus, orci justo auctor urna, et elementum orci dolor ac ante. Ut
                                varius sapien nec fringilla sodales. Suspendisse lacinia, metus eu
                                suscipit lobortis, enim sapien commodo sapien, non facilisis urna
                                elit eget elit.
                            </p>
                            <p>
                                Nulla facilisi. Sed venenatis pretium ante, sed tempor turpis
                                sagittis ac. Pellentesque habitant morbi tristique senectus et netus
                                et malesuada fames ac turpis egestas. Integer vel diam arcu.
                                Maecenas bibendum efficitur ex sit amet tristique. Nulla vel sapien
                                euismod, bibendum velit id, facilisis magna. Sed vestibulum nisi
                                vitae justo congue, eu bibendum augue interdum. Nam quis orci nec
                                nulla posuere facilisis. Etiam feugiat ligula quis est auctor, et
                                sagittis orci elementum. Vestibulum ante ipsum primis in faucibus
                                orci luctus et ultrices posuere cubilia Curae; Sed gravida neque vel
                                tellus volutpat, vel laoreet lacus commodo. Vivamus quis enim leo.
                            </p>
                            <div className="bg-gray-100 p-4 mt-4">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Buy Product</h2>
                                <ul className="xl:flex">

                                    {shopProducts.slice(0, 4).map((item, i) => {

                                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />



                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <div className="bg-gray-100 p-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
                            <ul className="list-none">

                                {recentPosts.slice(0, 5).map((item) => (
                                    < li key={item.id} className="mb-2" >
                                        <Link to={`/Blog/ ${item.id}`} className="text-gray-700 hover:text-gray-900">
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="bg-gray-100 p-4 mt-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
                            <ul className="list-none">

                                {shopProducts.slice(0, 3).map((item, i) => {

                                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />



                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default BlogDetail

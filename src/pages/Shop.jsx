import React, { useContext, useState } from 'react';
import Item from '../components/Items/Item';
import { ShopContext } from '../components/Context/ShopContext';

const Shop = (props) => {
    // Access the products from the context
    const { products } = useContext(ShopContext);
    console.log("this is shop page", products);




    // State for cart
    const [cart, setCart] = useState([]);

    // Function to handle adding items to the cart
    const addToCart = (item) => {
        console.log('add to cart clicked');
        setCart([...cart, item]); // Example logic to add item to the cart
    };

    return (
        <div className="container mx-auto px-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{props.title}</h1>
            </header>

            <div className="flex justify-between mb-8">
                <div className="relative w-1/4">
                    <input
                        type="text"
                        placeholder="Search products"
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <Item
                        key={item._id}
                        id={item._id}
                        name={item.title}
                        image={item.image}
                        price={item.salePrice}
                        old_price={item.price}
                        addToCart={() => addToCart(item)} // Pass the addToCart function with the item
                    />
                ))}
            </div>
        </div>
    );
};

export default Shop;

import React, { useContext } from 'react';
import { ShopContext } from '../../components/Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/Items/Item';

const SellerStore = () => {
    const { all_product } = useContext(ShopContext);
    const navigate = useNavigate();

    // Filter products by sellerId
    const sellerProducts = all_product.filter(product => product.seller.id === sellerId);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const sellerInfo = sellerProducts.length > 0 ? sellerProducts[0].seller : null;

    if (!sellerInfo) {
        return <div>No products available from this seller.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                {/* Seller Information */}
                <h1 className="text-3xl font-bold text-gray-800">{sellerInfo.name}'s Store</h1>
                <p className="mt-2 text-gray-600">Location: {sellerInfo.location}</p>
                <p className="mt-1 text-gray-600">Contact: {sellerInfo.contact}</p>
                <p className="mt-1 text-gray-600">Rating: {sellerInfo.rating} / 5</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sellerProducts.map((product, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg border shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <Item
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                new_price={product.new_price}
                                old_price={product.old_price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerStore;

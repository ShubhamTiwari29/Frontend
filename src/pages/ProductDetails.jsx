import React, { useContext } from 'react'
import { ShopContext } from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { all_product } = useContext(ShopContext);
    const { id } = useParams();
    const product = all_product.find(item => item.id === parseInt(id))
    console.log(product);
    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div>
            this is product detail page

            <p>
                <img src={product.image} alt="" />
            </p>
        </div>
    )
}

export default ProductDetails

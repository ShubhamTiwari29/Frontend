import React, { useContext } from 'react'
import { ShopContext } from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams;
    const product = all_product.find((e) => e.id === Number(productId))
    console.log(product);
    return (
        <div>
            this is product detail page
            <p>{product}</p>

        </div>
    )
}

export default ProductDetails

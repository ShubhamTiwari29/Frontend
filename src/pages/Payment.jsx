import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../components/Context/ShopContext';

const Payment = () => {
    const { id } = useParams();
    const { all_product } = useContext(ShopContext);
    const product = all_product.find(item => item.id === parseInt(id));
    return (
        <div>
            <div>
                <h1 className='font-bold'>Payment page</h1>
                <h1>Payment for {product.name}</h1>
                <img src={product.image} alt={product.name} />
                <p>Price: ${product.new_price}</p>

                <form>
                    <label>Card Number:</label>
                    <input type="text" name="cardNumber" required />
                    <label>Expiry Date:</label>
                    <input type="text" name="expiryDate" required />
                    <label>CVV:</label>
                    <input type="text" name="cvv" required />
                    <button type="submit">Pay Now</button>
                </form>
            </div>
        </div>
    )
}

export default Payment

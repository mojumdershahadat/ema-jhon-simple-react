import React from 'react';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import Cart from '../cart/Cart';
import ReviewItem from '../product/ReviewItem/ReviewItem';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import { useHistory } from 'react-router';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products)

    const history = useHistory();


    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    const handlePlaceOrder = () => {
             history.push('./placeOrder')
             setCart([]);
             clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem 
                        key={product.key}
                        handleRemove={handleRemove}
                        product={product}></ReviewItem>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button 
                    onClick={handlePlaceOrder}
                    className="btn-regular">Order place</button>
                </Cart>
            </div>

        </div>
    );
};

export default OrderReview;
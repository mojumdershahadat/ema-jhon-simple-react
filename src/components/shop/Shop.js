import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // product to be renderted on the UI
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
       fetch('./products.JSON')  
       .then(res => res.json())
       .then(data => {
           setProducts(data);
           setDisplayProducts(data);
        })
    }, [])

    useEffect( () => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
        for(const key in savedCart){
            // console.log(key);
            const addProduct = products.find( product => product.key === key);
            // console.log(key, addProduct);
            if (addProduct){
                const quantity = savedCart[key];
                addProduct.quantity = quantity;
                storedCart.push(addProduct);  
            }
        }
        setCart(storedCart);
        }
    }, [products])

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if (exists){
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity +1;
            newCart = [...rest, product];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart);
        // save to local storage
        addToDb(product.key);
    }  
    
    // search field
    const handleSearch = evant => {
        const searchTex = evant.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchTex.toLowerCase()));
        setDisplayProducts(matchedProducts);
        // console.log(matchedProducts.length);
    }
    return (
        <>
        <div className="search-container">
            <input onChange={handleSearch} type="text" placeholder="search your products" />
        </div>
          <div className="shop-container">
             <div className="product-container">
                {
                  displayProducts.map(product => <Product product = {product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                }
              </div>
              <div className="cart-container">
               <Cart cart={cart}>
                   <Link to="/review">
                   <button className="btn-regular">Add review</button>
                   </Link>
               </Cart>
               </div>
        
            </div>
        </>
        );
    };

export default Shop;
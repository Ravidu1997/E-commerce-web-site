import React, {useEffect, useState} from 'react'
import { commerce } from './lib/commerce';
import {Navbar, Products, Cart, Checkout} from './components';
import Commerce from '@chec/commerce.js';
import Main from './components/Main/Main';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({});
    const [errorMessage,setErrorMessage ]= useState('');

   const fetchProducts =async () =>{
        await commerce.products.list().then((info) =>setProducts(info.data))
   }

   const fetchCate =async () =>{
   await commerce.categories.list().then(categories => setCategories(categories.data));

}

   const fetchCart = async ()=>{
         setCart( await commerce.cart.retrieve())
   }

 const handleAddToCart = async (productId, quantity) =>{
     const {cart} = await commerce.cart.add(productId, quantity) 
     setCart(cart)
}

const handleUpdateCartQty = async (productId, quantity) =>{
   const {cart} = await commerce.cart.update(productId, { quantity});
   setCart(cart)

}
const handleRemoveFromCart = async (productId) =>{
  const { cart } = await commerce.cart.remove(productId)
  setCart(cart);
}

const handleEmptyCart = async() =>{
  const {cart} = await commerce.cart.empty(); 
  setCart(cart);
}

const refreshCart =async () =>{
  const newCart = await commerce.cart.refresh();
}

const handleCaptureCheckout = async (checkoutTokenId, newOrder) =>{
  try {
     const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
     setOrder(incomingOrder);
     refreshCart();
  }catch (error){
   setErrorMessage(error.data.error.message)
  }
}

   useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCate();

  },[])
  console.log(cart)
    return (
      <Router>
        <>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
            <Route exact path="/products" element={  <Products products={products}
                                                       categories={categories} 
                                                       onAddToCart={handleAddToCart} /> } />
             <Route exact path="/cart" element={<Cart cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
             
             />}/>
              <Route exact path="/checkout" element={<Checkout
               cart={cart}
               order={order}
               onCaptureCheckout ={handleCaptureCheckout}
               error={errorMessage } /> } />
              <Route path="/" element={<Main  categories={categories}/>}/>
         </Routes>
        </>
        </Router>
    )
}

export default App

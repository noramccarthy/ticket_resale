import React, { createContext, useState, useEffect } from 'react';

// create object called CartContext that we can use to share info thorughout our app
const CartContext = createContext();

const CartProvider = ({ children }) => {

    // number of items in the cart
    const [cartCount, setCartCount] = useState(() => {
        const cartCountFromStorage = localStorage.getItem('cartCount');
        return cartCountFromStorage ? JSON.parse(cartCountFromStorage) : 0;
    });

    // items in the card
    const [cartItems, setCartItems] = useState(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems');
        return cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
    });

    // getItem
    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems');
        const cartCountFromStorage = localStorage.getItem('cartCount');
        if (cartItemsFromStorage){
            setCartItems(JSON.parse(cartItemsFromStorage));
            setCartCount(JSON.parse(cartCountFromStorage));
        }
    }, []);
    
    // setItem
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', JSON.stringify(cartCount));
    }, [cartItems]);
    

    // addToCart function
    const addToCart = (ticket) => {

        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((item) => item._id === ticket._id);
            if (existingCartItem) {
                return prevCartItems.map((item) =>
                    item._id === ticket._id ? {...item, quantity: item.quantity + 1, totalCost: (item.quantity + 1) * item.price,} : item
            );
            } else {
                return [...prevCartItems, {...ticket, quantity: 1, totalCost: ticket.price}];
            }
        });
        // playSound();
        setCartCount(cartCount+1);
        
    };
    
    // clearCart function
    const clearCart = () => {
        setCartCount(0);
        setCartItems([]);
    };
    
    // removeFromDom
    const removeFromCart = (itemId, quantity) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
        setCartCount(cartCount - quantity);
        setCartItems(updatedCartItems);
        // playDeleteSound();
    
    };

    const updateCartItemQuantity = (itemID, newQuantity) => {
        setCartItems((prevCartItems) => {
            const item = prevCartItems.find((item) => item._id === itemID);
    
            if (item) {
            const newTotalCost = Math.floor((newQuantity * item.candyPrice)*100)/100

            const updatedCartItems = prevCartItems.map((item) =>
                item._id === itemID ? {...item, quantity: newQuantity, totalCost: newTotalCost} : item
            );
        
            const newCartCount = updatedCartItems.reduce((count, item) => count + item.quantity, 0);
            setCartCount(newCartCount); // Update cart count here
            return updatedCartItems;
            } else {
                return prevCartItems;
            }
        })
    };
    
    return (
        <CartContext.Provider value={{cartCount, setCartCount, cartItems, setCartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity}}>
        {children}
    </CartContext.Provider>
    )
};

export {CartContext, CartProvider}
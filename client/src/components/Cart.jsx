import axios from 'axios';
import React, { useState, useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// https://github.com/paypal/react-paypal-js
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import EmptyCart from '../assets/images/empty_cart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Modal from '../components/Modal';

import '../css/Cart.css'
import Footer from './Footer';

const PAYPAL_API = "AUXYLTAsvHFThBeI28d4bNu7sYxbtCo1RFiiYZs6L-_wWmJwAkej4vSFV7si14s1ozlo-SxZDntQI9xI";

const Cart = ({cartDetails, setCartDetails}) => {
    const [errorMessage, setErrorMessage] = useState({});
    const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useContext(CartContext);
    const [openModal, setOpenModal] = useState(true);

    const navigate = useNavigate();

    // discounted price
    const getDiscountPrice = (ticket) => {
        if(ticket.onSale && ticket.discount > 0) {
            return ticket.price - ticket.discount
        } else {
            return ticket.price
        }
    }
    
    // subtotal of all tickets in cart
    const cartSubtotal = () => {
        let subtotal = 0
        for (let i=0; i < cartItems.length; i++) {
            subtotal += updatedCart[i].totalCost;
        }
        return subtotal;
    }
    
    // add or decrease amount of tickets in cart
    const handleQuantityChange = (itemID, newQuantity) => {
        if (newQuantity < 1) return;
        
        const ticket = cartItems.find((item) => item._id === itemID);
        
        // out of stock
        if (newQuantity > ticket.stock - 1){
            setErrorMessage((previousErrors) => ({
                ...previousErrors, [itemID]: 'Out of stock',
            }))
        } else {
            setErrorMessage((previousErrors) => {
                const newErrors = {...previousErrors};
                delete newErrors[itemID];
                return newErrors;
            })
            updateCartItemQuantity(itemID, newQuantity);
        }
    }
    
    // map through these items
    const updatedCart = cartItems.map(ticket => ({
        ...ticket, totalCost: parseFloat(getDiscountPrice(ticket)) * ticket.quantity
    }))

    // decrease stock
    const updateStock = async (ticketID, quantity) => {
        try {
            const res = await axios.put('http://localhost:8000/api/ticket/update/' + ticketID, {quantity})
            console.log("Stock updated:", res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    // create json formatted list of items for PayPal transaction
    const items = cartItems.map((ticket) => (
        {
            name: ticket.artist,
            unit_amount: {
            currency_code: "USD",
            value: (ticket.price - ticket.discount).toFixed(2)
            },
            quantity: ticket.quantity,
        }
        ));

    return (
        <>
            <div className='body-cart'>
                <Navbar/>
                <Modal
                    open={openModal} 
                    onClose={() => setOpenModal(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    
                </Modal>

                <div className='checkout'>
                    {updatedCart.length !== 0 ? 
                        <form className='row d-flex justify-content-center'>
                            <h1 className='shopping-cart-title'>Shopping Cart</h1>
                            <div className='col-8'>
                                {updatedCart.map((ticket) => (
                                    <div className="each-ticket row">
                                    <div className="ticket-title d-flex col-6">
                                        <div className="me-3">
                                            <Link to={`/ticket/${ticket._id}`}>
                                            <img className="cart-ticket-img" src={ticket.image} alt={ticket.artist} />
                                            </Link>
                                        </div>
                                        <div className="link-title d-flex align-items-center">{ticket.artist}</div>
                                        </div>
                                    
                                        <div className="d-flex justify-content-end align-items-center gap-3 col-6">
                                        <div className="ticket-price">${ticket.totalCost.toFixed(2)}</div>

                                        <div className="quantity-control d-flex align-items-center gap-2">
                                            <i
                                                className="fa-solid fa-minus quantity-icon"
                                                onClick={(event) => {
                                                event.preventDefault();
                                                handleQuantityChange(ticket._id, ticket.quantity - 1);
                                                }}
                                            ></i>

                                            <span className="quantity-display">{ticket.quantity}</span>

                                            <i
                                                className="fa-solid fa-plus quantity-icon"
                                                onClick={(event) => {
                                                event.preventDefault();
                                                handleQuantityChange(ticket._id, ticket.quantity + 1);
                                                }}
                                            ></i>
                                            </div>

                                    
                                        {/* <div className="quantity-control d-flex align-items-center">
                                            <button className="quantity-button" onClick={(event) => { event.preventDefault(); handleQuantityChange(ticket._id, ticket.quantity - 1) }}>-</button>
                                            <span className="quantity-display">{ticket.quantity}</span>
                                            <button className="quantity-button" onClick={(event) => { event.preventDefault(); handleQuantityChange(ticket._id, ticket.quantity + 1) }}>+</button>
                                        </div> */}
                                    
                                        <button className="trashcan" onClick={() => removeFromCart(ticket._id, ticket.quantity)}>
                                            <FontAwesomeIcon icon={faTrashCan} size="lg" />
                                        </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="col-3 checkout-cart">
                                <h3 className='cart-summary-title'>Cart Summary</h3>
                                    <div className="scrollable-cart-body">
                                        {updatedCart.map((ticket) => (
                                                <div key={ticket._id} className='mapped-cart'>
                                                    <span className='mapped-tickets'>{ticket.artist}</span>
                                                    <span className='mapped-price'>${ticket.totalCost.toFixed(2)}</span>
                                                </div>
                                        ))}
                                    </div>

                                    <hr className='cart-divider'/>

                                <div className="subtotal-container">
                                    <span className='checkout-subtotal'> Subtotal</span>
                                    <span className='checkout-subtotal-price'>${cartSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="paypal-container">
                                    <PayPalScriptProvider className="paypal-section"
                                        // Use the PayPalScriptProvider options prop to configure the JS SDK
                                        // It accepts an object for passing query parameters and data attributes to the JS SDK script
                                        options={{ "clientId": PAYPAL_API }} >
                                        <PayPalButtons
                                            forceReRender={items}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                purchase_units: [{
                                                        amount: {
                                                        currency_code: "USD",
                                                        value: cartSubtotal().toFixed(2),
                                                        breakdown: {
                                                            item_total: {
                                                                currency_code: "USD",
                                                                value: cartSubtotal().toFixed(2)
                                                            },
                                                        }
                                                    },
                                                    items: items
                                                }]})
                                            }}
                                            onApprove={async (data, actions) => {
                                                const details = await actions.order.capture()
                                                    setCartDetails(details)   // This needs to lift state to App.js
                                                    {cartItems.map((ticket) => (
                                                        <div key={ticket._id}>
                                                            {updateStock(ticket._id, ticket.stock - ticket.quantity)}
                                                        </div>
                                                    ))
                                                    }

                                                clearCart();
                                                navigate("/ticket/receipt")
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            </div>
                        </form>
                        : 
                        <div className="empty-container">
                            <img className="empty-image" src={EmptyCart} alt="empty" />
                        </div>
                    }
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Cart;
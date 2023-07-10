import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import EmptyCart from '../assets/images/empty_cart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../css/Cart.css'

const Cart = ({cartDetails, setCartDetails}) => {
    const [errorMessage, setErrorMessage] = useState({});
    const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
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

    // create json list of tickets for PayPal


    return (
        <>
        <div className="body_cart">
        <Navbar />

        <form className='main_form_cart'>
            <div className="cart_items_card">
                
            {updatedCart.map((ticket) => (
                <div key={ticket._id} className="each-ticket">
                <div className="ticket-text">
                    <h6 className="cart-title">
                    <Link className="link-title" to={`/one/ticket/${ticket._id}`}>{ticket.artist}</Link>
                    </h6>
                    <h6 className="ticket-price">${ticket.totalCost.toFixed(2)}</h6>
                    <div className="quantity-control">
                    <button
                        className="quantity-button left_btn"
                        onClick={(event) => { event.preventDefault(); handleQuantityChange(ticket._id, ticket.quantity - 1) }}
                    >
                        -
                    </button>
                    <span className="quantity-display">{ticket.quantity}</span>
                    <button
                        className="quantity-button"
                        onClick={(event) => { event.preventDefault(); handleQuantityChange(ticket._id, ticket.quantity + 1) }}
                    >
                        +
                    </button>
                    <button className="trashcan" onClick={() => removeFromCart(ticket._id, ticket.quantity)} >
                        <FontAwesomeIcon icon={faTrashCan} size="lg"/>
                    </button>

                    </div>
                    {errorMessage[ticket._id] && (
                    <div className="error-message">{errorMessage[ticket._id]}</div>
                    )}
                </div>
                <Link to={`/ticket/${ticket._id}`}>
                    <img
                    className="ticket-img"
                    src={ticket.img}
                    alt="Placeholder"
                    />
                </Link>
                </div>
            ))}
            </div>
            {updatedCart.length !== 0 ?
            <div className="checkout_main_section_cart">
                <h3 className='cart-summary-title'>Cart Summary</h3>
                <div className="scrollable-cart-body">
                {updatedCart.map((ticket) => (
                    <div key={ticket._id} className='mapped-cart'>
                    <h4 className='mapped-tickets'>{ticket.artist}</h4>
                    <div className="separator">
                        <h4 className='mapped-tickets'>${ticket.totalCost.toFixed(2)}</h4>
                    </div>
                    </div>
                ))}
                </div>
                <div className="subtotal-container">
                    <h4 className='checkout_subtotal'> Subtotal</h4>
                    <h4 className='checkout_subtotal'>${cartSubtotal().toFixed(2)}</h4>
                </div>

                {/* <div className="paypal_container">
                    <PayPalScriptProvider className="PayaplSection"
                        options={{ "client-id": PAYPAL_API }} >
                        <PayPalButtons
                        forceReRender={items}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                            purchase_units: [{
                                    amount: {
                                    currency_code: "USD",
                                    value: getSubTotal().toFixed(2),
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: getSubTotal().toFixed(2)
                                        },
                                    }
                                },
                                items: items
                            }]})
                        }}
                        onApprove={async (data, actions) => {
                            const details = await actions.order.capture()
                            setDetails(details)   // This needs to lift state to App.js
                            {
                            cartItems.map((aCandy) => (
                                <div key={aCandy._id}>
                                {updateCandyStock(aCandy._id, aCandy.candyStock - aCandy.quantity)}
                                </div>
                            ))
                            }
                            clearCart();
                            navigate("/candy/receipt")
                            // const name = details.payer.name;
                            // const amount = details.purchase_units[0].amount;
                            // const address = details.purchase_units[0].shipping.address;
                            // const order_id = details.id;
                            // console.log(details)
                            // alert("🍬🍭Payment successful!🍫🍡" + "\r" +
                            // "Transaction completed by " + name.given_name + " " + name.surname + " for $" + amount.value + " " + amount.currency_code + "\r" +
                            // "Order " + order_id + " will be shipped to: " + address.address_line_1 + ", " + address.admin_area_2 + ", " + address.admin_area_1 + ", " + address.postal_code + " " + address.country_code);
                        }}
                        />
                    </PayPalScriptProvider>
                </div> */}
            </div>
            :
            <div className="empty-container">
                <img className="empty-image" src={EmptyCart} alt="empty" />
                {/* <div className="wrapping_empty_cart"> */}
                {/* </div> */}
                {/* <span className="cart_empty_span"></span> */}
            </div>
            }
        </form>
        {/* <Footer className="Footerclass" /> */}
        </div>
        </>
    )
}

export default Cart;
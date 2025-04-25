import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'
import '../css/TicketDetail.css';
import Navbar from './Navbar';
import Footer from './Footer';
import PaymentBadge from '../assets/images/PaymentBadge.png'
import Map from './Map';
import Layout from './Layout';

const TicketDetail = () => {
    const {id} = useParams();
    const [ticket, setTicket] = useState([])
    const [month, setMonth] = useState([])
    const [day, setDay] = useState([])
    const [year, setYear] = useState([])
    const [time, setTime] = useState([])
    const { addedMessage, addToCart, cartCount, cartItems } = useContext(CartContext);

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket/" + id)
        .then((res) => {
            setTicket(res.data)
            console.log("Ticket:", res.data)

            const date = new Date(res.data.date)
            setMonth(date.toLocaleString('en-US', {month: 'long'}))
            setDay(date.toLocaleDateString('en-US', {day: '2-digit'}))
            setYear(date.getFullYear())

            setTime(new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(date))
            
        })
        .catch((err) => console.log(err))
    },[id])

    // check if ticket is in stock
    const isInStock = (ticket) => {
        if (!cartItems) return false;

        const ticketInCart = cartItems.find((item) => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock -1;
    };

    // discounted price
    const getDiscountPrice = (ticket) => {
        if(ticket.onSale && ticket.discount > 0) {
            return ticket.price - ticket.discount
        } else {
            return ticket.price
        }
    }

    // addToCart function
    const handleAddToCart = (ticket) => {
        addToCart(ticket);
    }


    return (
        <Layout>
            <div className="product-page">
                <div className="product-card">
                    <div className="product-image">
                        <img src={ticket.image} alt={ticket.artist} />
                    </div>

                    <div className="product-details">
                        <h1 className="product-title">{ticket.artist}</h1>
                        <p className="product-description">{ticket.description}</p>

                        <div className="product-info-date">
                            {month} {day}, {year} at {time}
                        </div>

                        <div className="product-price">
                            {ticket.onSale && ticket.discount ? (
                                <>
                                    <span className="original-price">${ticket.price}</span>
                                    <span className="sale-price">${getDiscountPrice()}</span>
                                </>
                            ) : (
                                <span className="sale-price">${ticket.price}</span>
                            )}
                        </div>

                        <div className="product-stock">
                            {ticket.stock > 0 ? (
                                <span className="in-stock">{ticket.stock} in stock</span>
                            ) : (
                                <span className="out-of-stock">Out of Stock</span>
                            )}
                        </div>

                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={isInStock()}
                        >
                            {isInStock() ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <div className="payment-badge-wrapper">
                            <img className="payment-badge" src={PaymentBadge} alt="Payment Options" />
                        </div>
                    </div>
                </div>

                <section className="one-ticket-map">
                    <div className="one-ticket-map-container">
                        <Map longitude={ticket.lon} latitude={ticket.lat} />
                        <div className="one-ticket-address">
                            <strong>{ticket.location}</strong>
                            <div>{ticket.address}</div>
                            <div>{ticket.city}, {ticket.state}</div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )

}

export default TicketDetail;
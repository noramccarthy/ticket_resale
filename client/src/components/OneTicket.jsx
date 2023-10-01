import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'
import '../css/OneTicket.css';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import PaymentBadge from '../assets/images/PaymentBadge.png'
import Map from '../components/Map';

const OneTicket = () => {
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
            console.log(res.data)

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
    const addToCartHandler = (ticket) => {
        addToCart(ticket);
    }


    return (
        <div className='one-ticket-container'>
            <Navbar/>
    
            <section className='main-ticket-container'>
                <div className='one-ticket-image-container'>
                    <img classname="one-artist-picture" src={ticket.image} alt={ticket.artist} />
                </div>

                <div className="one-ticket-description-container">
                    <h6 className='one-ticket-artist'>{ticket.artist}</h6>

                    <div className='one-ticket-info'>
                        <div>{month} {day}, {year}</div>
                        <div>{time}</div>
                    </div>

                    <div className='one-ticket-prices'>
                        {ticket.onSale && ticket.discount > 0 ? (
                            <div>
                                <span className='one-ticket-discount-price' style={{ textDecoration: 'line-through' }}>
                                    ${ticket.price}
                                </span>{' '}
                                <span className='one-ticket-original-price'>${getDiscountPrice(ticket)}</span>
                            </div>
                        ) : (
                            <div className='one-ticket-original-price'>${ticket.price}</div>
                        )}
                    </div>

                    <div className="one-ticket-payment">
                        <button
                            className='one-ticket-addToCart'
                            onClick={() => addToCartHandler(ticket)}
                            disabled={isInStock(ticket)}
                        >
                            {isInStock(ticket) ? "Out of Stock" : "Add to Cart"}
                        </button>
                        <img className="payment-badge" src={PaymentBadge} alt="Payment Options" />
                    </div>
                </div>
            </section>

            <section className='one-ticket-map'>
                <div className='one-ticket-map-container'>
                    <Map
                        longitude={ticket.lon}
                        latitude={ticket.lat}
                        location={ticket.location}
                    />
                    
                    <div className='one-ticket-address'>
                        <div style={{fontWeight:700}}>{ticket.location}</div>
                        <div>{ticket.address}</div>
                        <div>{ticket.city}, {ticket.state}</div>
                    </div>
                </div>
            </section>

            <Footer/>


        </div>

    )

}

export default OneTicket;
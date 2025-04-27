import api from '../services/api';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../css/TicketDetail.css';
import PaymentBadge from '../assets/images/PaymentBadge.png';
import Map from './Map';
import Layout from './Layout';

const TicketDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState({});
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [time, setTime] = useState('');
    const { addToCart, cartItems } = useContext(CartContext);

    useEffect(() => {
        api.get(`/ticket/${id}`)
            .then((res) => {
                const ticket = res.data;
                setTicket(ticket);
                const date = new Date(ticket.date);
                setMonth(date.toLocaleString('en-US', { month: 'long' }));
                setDay(date.toLocaleDateString('en-US', { day: '2-digit' }));
                setYear(date.getFullYear());
                setTime(new Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric' }).format(date));
            })
            .catch((err) => console.log(err));
    }, [id]);

    const isInStock = (ticket) => {
        if (!cartItems) return false;
        const ticketInCart = cartItems.find(item => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock;
    };

    const getDiscountPrice = (ticket) => {
        return ticket.onSale && ticket.discount > 0
            ? ticket.price - ticket.discount
            : ticket.price;
    };

    const handleAddToCart = () => {
        addToCart(ticket);
    };

    return (
        <Layout>
            <div className="ticket-page">
                <div className="ticket-detail-card">
                    <div className="ticket-image-section">
                        <img src={ticket.image} alt={ticket.artist} className="ticket-detail-image" />
                    </div>
                    <div className="ticket-info-section">
                        <h1 className="ticket-title">{ticket.artist}</h1>
                        <div className='ticket-detail-venue'>
                            {ticket.location}   
                        </div>
                        <div className="ticket-detail-date">
                            {month} {day}, {year} · {time}
                        </div>
                        <div className="ticket-info-header">
                            <div className="ticket-price">
                                {ticket.onSale && ticket.discount ? (
                                <>
                                    <span className="price-original">${ticket.price}</span>
                                    <span className="price-discounted">${getDiscountPrice(ticket)}</span>
                                    <span className="price-text">each</span>
                                </>
                                ) : (
                                    <>
                                    <span className="price-discounted">${ticket.price}</span>
                                    <span className="price-text">each</span> 
                                </>
                                )}
                            </div>
                            <div className="ticket-detail-seats">
                                <span className="seat-item"><strong>Section</strong> {ticket.section} </span>
                                <span className="seat-item"><strong>Row</strong> {ticket.row} </span>
                                <span className="seat-item"><strong>Seats</strong> {ticket.seat} </span>
                            </div>
                        </div>
                        <div className="tickets-left"><strong>Tickets left:</strong> {ticket.stock}</div>
                        <button
                            className="add-to-cart"
                            onClick={handleAddToCart}
                            disabled={isInStock(ticket)}
                        >
                            {isInStock(ticket) ? 'Sold Out' : 'Add to Cart'}
                        </button>
                        <div className="payment-info">
                            <img src={PaymentBadge} alt="Secure Payment Options" className="payment-badge" />
                        </div>
                    </div>
                </div>
                <div className="ticket-location-card">
                    <div className="ticket-location-details">
                        <strong className="location-venue">{ticket.location}</strong>
                        <div className="location-address">{ticket.address}</div>
                        <div className="location-city">{ticket.city}, {ticket.state}</div>
                    </div>
                    <div className="map-detail-section">
                        <Map
                            longitude={ticket.lon}
                            latitude={ticket.lat}
                            location={ticket.location}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TicketDetail;

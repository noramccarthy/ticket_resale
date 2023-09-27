import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'
import '../css/OneTicket.css';
import Navbar from '../components/Navbar';
import Footer from './Footer';
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

    return (
        <>
        <Navbar/>

        <div className='one-ticket-container'>
            <div className='one-ticket-body'>
                <article class="one-ticket-card">

                    <section className='one-ticket-img'>
                        <img classname="artist-picture" src={ticket.image} alt={ticket.artist} />
                    </section>

                    <section class="one-ticket-info">
                        <div className='your-ticket-artist'>
                            <div>{ticket.artist}</div>
                        </div>

                        <div class="one-ticket-dates">
                                <div>{month} {day}, {year}</div>
                                <div>{time}</div>
                        </div>
                        <div class="one-ticket-location">
                            {ticket.location}
                        </div>
                        <Link className='update-link' to={`/admin/update/${ticket._id}`}> Update</Link>
                    </section>
                </article>

                <Map
                    longitude={ticket.lon}
                    latitude={ticket.lat}
                    location={ticket.location}
                />
            </div>
        </div>

        <Footer/>
        </>
    )

}

export default OneTicket;
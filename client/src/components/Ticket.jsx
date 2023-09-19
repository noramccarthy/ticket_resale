import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Ticket.css'


const Ticket = ({ticket, discount, cart, stock}) => {
    const date = new Date(ticket.date)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const day = date.toLocaleDateString('en-US', {day: '2-digit'})
    const year = date.getFullYear();

    const time = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(ticket.date))


    return (
        <>
            <div className='ticket-info'>
                <Link to={'/ticket/' + ticket._id}>
                    <img className='ticket-image' src={ticket.image} alt="Placeholder"/>
                </Link>

                <div className='ticket-artist'>
                    <Link to={'/ticket/' + ticket._id}>{ticket.artist}</Link>
                </div>

                <div className='ticket-date'>
                    <span>{day}</span> &nbsp;<span>{month}</span>&nbsp;<span>{year}</span>
                </div>

                {ticket.onSale && ticket.discount > 0 ? (
                    <div className='ticket-price-discount'>
                        <span className='onsale-ticket'>${ticket.price.toFixed(2)}</span> &nbsp;
                        <span>${discount(ticket).toFixed(2)}</span>
                    </div>
                ) : (
                    <div className='ticket-original-price'>${ticket.price.toFixed(2)}</div>
                )}

                <div className='ticket-stock'>
                    <div>Stock: {ticket.stock}</div>
                </div>

                <div className='ticket-addToCart-container'>
                    <button className='addToCart-button' onClick={() => cart(ticket)} disabled={stock(ticket)}>
                        {stock(ticket) ? "No tickets left" : "Add to cart"}
                    </button>
                </div>

            </div>
        </>
    )
}

export default Ticket;
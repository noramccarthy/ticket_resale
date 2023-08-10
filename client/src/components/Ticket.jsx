import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Ticket.css'


const Ticket = ({ticket, discount, cart, stock}) => {

    return (
        <>
            <Link to={'/one/ticket/' + ticket._id}>
                            <img className='ticket-image' src={ticket.image} alt="Placeholder"/>
                        </Link>

                        <div className='ticket-text'>
                            <h3 className='ticket-title'>
                                <Link to={'/ticket/' + ticket._id}>{ticket.artist}</Link>
                            </h3>

                            {ticket.onSale && ticket.discount > 0 ? (
                                <div>
                                    <h6 className='ticket-price-discount'>
                                        <span className='onsale-ticket'>
                                            ${ticket.price.toFixed(2)}
                                        </span>
                                            ${discount(ticket).toFixed(2)}
                                    </h6>
                                </div>
                            ) : (
                                <h6 className='ticket-price'>${ticket.price.toFixed(2)}</h6>
                            )}

                            <button className='ticket-addToCart' onClick={() => cart(ticket)} disabled={stock(ticket)}>
                                {stock(ticket) ? "No tickets left" : "Add to cart"}
                            </button>

                        </div>
        </>
    )
}

export default Ticket;
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'
import '../css/OneCandy.css'


const OneTicket = () => {
    const {id} = useParams();
    const [ticket, setTicket] = useState([])
    const { addedMessage, addToCart, cartCount, cartItems } = useContext(CartContext);

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket/" + id)
        .then((res) => {
            setTicket(res.data)
            console.log(res.data)
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
            <div>
                {ticket.artist}
            </div>
            
        </>
    )

}

export default OneTicket;
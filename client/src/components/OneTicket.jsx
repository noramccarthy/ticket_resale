import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { CartContext } from '../context/CartContext'

import '../css/OneCandy.css'


const OneTicket = () => {
    const {id} = useParams();
    const [ticket, setTicket] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket/" + id)
        .then((res) => {
            setTicket(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    },[id])


    return (
        <>
            <div>
                {ticket.artist}
            </div>
        </>
    )

}

export default OneTicket;
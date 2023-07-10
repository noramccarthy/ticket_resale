import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket")
        .then((res) => {
            setTickets(res.data)
        })
        .catch((err) => console.log(err))
    },[])


    return (
        <div>
            {tickets.map((ticket, index) => {
                return (
                    <div key={ticket._id}>
                        {ticket}
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Tickets;
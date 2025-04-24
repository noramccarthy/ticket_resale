import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleTicket from './SingleTicket';
import '../css/AdminDashboard.css'
import Layout from './Layout';

const UserTickets = () => {
    const [adminTickets, setAdminTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/yourtickets", {withCredentials:true})
        .then(res => {
            setAdminTickets(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            navigate("/")
            console.log("Error:", err);
        })
    },[])

    return (
        <Layout>
            <div className='admin-dashboard'>
                <h1 className='your-listings-title'>Your Listings</h1>
                <div class="admin-container">
                    <section className='your-listings-container'>
                        {adminTickets.length > 0 ? (
                            <div className='your-listings-body'>
                                {adminTickets.map((ticket) => (
                                    <div key= {ticket._id}>
                                        <SingleTicket 
                                            ticket={ticket}
                                        />
                                    </div>
                                ))}
                            </div>
                            ) : ( 
                                null
                            )}
                    </section>
                </div>
            </div>
        </Layout>
    )
}


export default UserTickets;
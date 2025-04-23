import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import SingleTicket from './SingleTicket';
import Sidebar from './Sidebar';
import '../css/AdminDashboard.css'

const UserTickets = (props) => {
    const [adminTickets, setAdminTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/yourtickets", {withCredentials:true})
        .then(res => {
            setAdminTickets(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            // props.setAuthorized("Please Login First")
            navigate("/admin/login")
            console.log("Error:", err);
        })
    },[])


    return (
        <>
        <AdminNavbar/>
        <Sidebar/>

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
            <Footer/>

        </div>

        </>
    )
}


export default UserTickets;
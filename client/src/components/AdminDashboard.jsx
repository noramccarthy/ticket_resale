import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import '../css/AdminDashboard.css'
import YourTicket from './YourTicket';
import Footer from './Footer';

const AdminDashboard = (props) => {
    const [adminTickets, setAdminTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/yourtickets", {withCredentials:true})
        .then(res => {
            setAdminTickets(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            props.setAuthorized("Please Login!")
            navigate("/admin/login")
            console.log(err);
        })
    },[])

    return (
        <>
        <AdminNavbar/>

        <section class="listings-container">
            <h1 className='your-listings'>Your Listings</h1>

            {adminTickets.length > 0 ? (
                <div className='listings-body'>

                    {adminTickets.map((ticket) => (
                        <div key= {ticket._id}>
                            <YourTicket 
                                ticket={ticket}
                            />
                        </div>
                    ))}
                </div>
                ) : ( 
                    null
                )}
        </section>

        <Footer/>
        </>
    )
}


export default AdminDashboard;
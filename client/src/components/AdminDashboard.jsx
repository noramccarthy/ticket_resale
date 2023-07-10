import '../css/AdminDashboard.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = ({authorized, setAuthorized}) => {
    const [adminTickets, setAdminTickets] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/yourtickets", {withCredentials:true})
        .then(res => {
            setAdminTickets(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <>
        <AdminNavbar/>

        <h2 className='pt-5'>Your listings</h2>
        <p>
            {adminTickets.map((ticket) => (
                <div key = {ticket._id} className='ticket'>
                    {ticket.artist}
                </div>
            ))}
        </p>


        </>
    )
}


export default AdminDashboard;
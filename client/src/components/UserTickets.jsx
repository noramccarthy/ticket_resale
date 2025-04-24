import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleTicket from './SingleTicket';
import '../css/AdminDashboard.css';
import Layout from './Layout';
import '../css/UserTickets.css';

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
            <div class="listing-container">
                <div class="event-schedule-area-two">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="listing-section-title">
                                <h2>Your Tickets</h2>
                            </div>
                        </div>
                    </div>
                    {adminTickets.length > 0 ? (
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="tab-content" id="myTabContent">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="text-center" scope="col">Date</th>
                                                    <th class="text-center" scope="col"></th>
                                                    <th class="text-center" scope="col">Artist</th>
                                                    <th class="text-center" scope="col">Status</th>
                                                    <th class="text-center" scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {adminTickets.map((ticket) => (
                                                <SingleTicket 
                                                    key={ticket._id} 
                                                    ticket={ticket} 
                                                />
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    )
}


export default UserTickets;
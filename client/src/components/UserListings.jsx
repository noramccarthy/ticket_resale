import api from '../services/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleTicket from './SingleTicket';
import Layout from './Layout';
import '../css/UserTickets.css';

const UserListings = () => {
    const [adminTickets, setAdminTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/admin/yourtickets", {withCredentials:true})
        .then(res => {
            setAdminTickets(res.data);
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
                                <h2>Your Listings</h2>
                            </div>
                        </div>
                    </div>
                    <div className='listing-body-content'>
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
                                                        <th class="text-center" scope="col"></th>
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
            </div>
        </Layout>
    )
}


export default UserListings;
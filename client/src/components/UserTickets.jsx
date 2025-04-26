import React from 'react';
import '../css/AdminDashboard.css';
import Layout from './Layout';
import '../css/UserTickets.css';

const UserTickets = () => {
    return (
        <Layout>
            <div class="listing-container">
                <div className='empty-listings'>
                    <h4>You do not have any tickets listed for sale.</h4>
                    <p>Once you create a ticket listing, your details will be available here.</p>
                </div>
            </div>
        </Layout>
    )
}

export default UserTickets;
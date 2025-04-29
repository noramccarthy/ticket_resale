import React from 'react';
import Layout from './Layout';
import '../css/UserTickets.css';

const UserTickets = () => {
    return (
        <Layout>
            <div class="listing-container">
                <div className='empty-listings'>
                    <h4>No tickets yet!</h4>
                    <p>Once you purchase tickets, they’ll show up here for easy access.</p>
                </div>
            </div>
        </Layout>
    )
}

export default UserTickets;
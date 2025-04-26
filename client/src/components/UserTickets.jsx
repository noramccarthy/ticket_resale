import React from 'react';
import '../css/AdminDashboard.css';
import Layout from './Layout';
import '../css/UserTickets.css';

const UserTickets = () => {
    return (
        <Layout>
            <div class="listing-container">
                {/* <div class="event-schedule-area-two">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="listing-section-title">
                                <h2>Your Tickets</h2>
                            </div>
                        </div>
                    </div>
            
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
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='empty-listings'>
                    <h4>You do not have any tickets listed for sale.</h4>
                    <p>Once you create a ticket listing, your details will be available here.</p>
                </div>
            </div>
        </Layout>
    )
}

export default UserTickets;
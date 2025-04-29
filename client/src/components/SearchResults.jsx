import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SingleTicketResults from './SingleTicketResults';
import Layout from './Layout';
import '../css/SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const { results, searchTerm } = location.state || { results: [], searchTerm: ''};
    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
            <Layout>
                <div className="search-results-container">
                    <div className='search-results-body-content'>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="search-results-title">
                                    <h4>Yay! Here's what we found for "{searchTerm}"</h4> 
                                </div>
                            </div>
                        </div>

                        {/* Flex container to hold tickets and sidebar */}
                        
                            <div className="search-results-content">
                                {/* Left: Ticket Results */}
                                <div className="search-results-tickets">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="tab-content" id="myTabContent">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-center" scope="col">Date</th>
                                                                <th className="text-center" scope="col"></th>
                                                                <th className="text-center" scope="col">Artist</th>
                                                                <th className="text-center" scope="col">Venue</th>
                                                                <th className="text-center" scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {results.map((ticket) => (
                                                                <SingleTicketResults 
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
                                </div>
        
                                {/* Right: Sidebar for login prompt if not logged in */}
                                {!isLoggedIn ? (
                                    <div className="ticket-login-sidebar mt-5">
                                        <h5>Have tickets to list?</h5>
                                        <p>Log in first to get started!</p>
                                        <Link to="/login" className="sidebar-login-link-btn">
                                            Log In
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="ticket-login-sidebar mt-5">
                                        <h5>Ready to sell your tickets?</h5>
                                        <p>Let's get your listings live!</p>
                                        <Link to="/tickets/create" className="sidebar-login-link-btn">
                                            List Tickets
                                        </Link>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
            </Layout>
    )
}


export default SearchResults;
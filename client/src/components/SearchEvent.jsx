import { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from './Layout';
import '../css/SearchEvent.css';

const PAGE_SIZE = 20;

const SearchEvent = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [select, setSelect] = useState("");
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const topOfResultsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > window.innerHeight / 2);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalPages = Math.ceil(events.length / PAGE_SIZE);
    const pages = Array.from(Array(totalPages).keys());
    const paginatedEvents = events.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 800, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const query = searchInput.trim().replace(/\s+/g, '+');

        try {
            const response = await axios.get(`https://api.seatgeek.com/2/events`, {
                params: {
                    client_id: 'MjkzNzI3MDF8MTY4OTAyMjc0MC40MTAxMDc2',
                    per_page: 25,
                    q: query
                }
            });
            const data = await response.json();
            setEvents(data.events);
            setCurrentPage(0);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                if (topOfResultsRef.current) {
                    topOfResultsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    if (!isLoggedIn) {
        return (
            <p>
                You need to be logged in to access this page.{' '}
                <Link to="/admin/login">Login</Link>
            </p>
        );
}
    return (
        <Layout>
            <div className="search-wrapper">
                <div className="search-container">
                    <h4 className="mb-4 text-center">Sell Your Tickets Effortlessly</h4>
                    <p className="text-center mb-4">Search events using SeatGeek’s powerful API and list your tickets in just a few clicks.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="position-relative mb-4">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Type to search..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="search-btn">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <section className="section-2" ref={topOfResultsRef}>
                {loading && (
                    <div className="text-center my-4">
                        <p>Loading results...</p>
                    </div>
                )}

                {!loading && paginatedEvents.length > 0 && (
                    <div>
                        <section className="events-container" id="results">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" scope="col">Date</th>
                                                        <th className="text-center" scope="col">Artist</th>
                                                        <th className="text-center" scope="col">Venue</th>
                                                        <th className="text-center" scope="col">List</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedEvents.map((event) => (
                                                        <tr key={event.id}>
                                                            {/* Date and Time */}
                                                            <td className="text-center">
                                                                <span>
                                                                    {new Date(event.datetime_local).toLocaleDateString('en-US', { day: '2-digit' })}{' '}
                                                                    {new Date(event.datetime_local).toLocaleDateString('en-US', { month: 'short' })}{' '}
                                                                    {new Date(event.datetime_local).getFullYear()}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    {new Intl.DateTimeFormat('default', {
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                    }).format(new Date(event.datetime_local))}
                                                                </span>
                                                            </td>

                                                            {/* Artist */}
                                                            <td className="text-center">{event.short_title}</td>

                                                            {/* Venue and Location */}
                                                            <td className="text-center">{event.venue.name}, {event.venue.display_location}</td>

                                                            {/* List Link */}
                                                            <td className="text-center">
                                                                <Link to={`/admin/create/${event.id}`} className="event-list-btn">
                                                                    List
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Pagination Controls - Numbered Buttons Only */}
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`page-number${index === currentPage ? ' active' : ''}`}
                                    onClick={() => changePage(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && events.length === 0 && (
                    <div className="text-center my-5">
                        <p>No events found. Try another search.</p>
                    </div>
                )}
            </section>
        </Layout>
    )
}

export default SearchEvent;
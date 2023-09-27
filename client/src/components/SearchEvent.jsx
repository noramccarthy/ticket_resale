import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import '../css/SearchEvent.css'


const SearchEvent = props => {
    const [searchInput, setSearchInput] = useState("");
    const [select, setSelect] = useState("");
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    // const totalPages = Math.ceil(
    //     events.filter((event) => !select || event.title.includes(select)).length /
    //     PAGE_SIZE
    // );
    // const pages = Array.from(Array(totalPages).keys());
    
    // const changePage = (pageNumber) => {
    // setCurrentPage(pageNumber);
    // window.scrollTo(0, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        async function fetchEvent() {
            const newSearchInput = searchInput.replace(/\s/g, '+');

            const response = await fetch(
                "https://api.seatgeek.com/2/events?client_id=MjkzNzI3MDF8MTY4OTAyMjc0MC40MTAxMDc2&per_page=25&q=" + newSearchInput
            )

            const data = await response.json()
            console.log("Data:", data)
            setEvents(data.events)
            console.log("Events:", events)
        }
        fetchEvent();
    }

    const handleClickScroll = () => {
        const element = document.getElementById('section-2');
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <>
        <AdminNavbar/>

        <div className='section' id='booking'>
            <div className='section-center'>
                <div className='booking-container'>
                    <div className='row booking-row'>
                        <div className='booking-form'>
                            <form onSubmit={handleSubmit}>
                                <div className='row form-row'>
                                    <div className='col-md-10'>
                                        <div className='form-group'>
                                            <input
                                                type="text"
                                                className='form-control'
                                                placeholder="What are you looking for?"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='form-button'>
                                            <button type='submit' className='search-event-button' onClick={handleClickScroll}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='section-2'>
            <div className='space'></div>
            <div className='results-container'>
                {events.length > 0 ? (
                    <div className='events-container'>
                        {events.map((event) => 
                            <div key={event.id} className='each-event'>
                                <Link to={'/admin/create/' + event.id} className='event-title'>
                                    {event.title}
                                </Link>

                                    <article class="event-card">
                                        <section className='event-date'>
                                            <div className='event-time'>
                                                <span>{new Date(event.datetime_local).toLocaleDateString('en-US', {day: '2-digit'})}</span><span>{new Date(event.datetime_local).toLocaleDateString('en-US', {month: 'long'})}</span>
                                            </div>
                                        </section>

                                        <section class="event-info">
                                            {/* <div className='event-artist'> */}
                                                {/* <div>{event.title}</div> */}
                                            {/* </div> */}

                                            <div class="event-dates">
                                                    <div>{new Date(event.datetime_local).toLocaleDateString('en-US', {month: 'long'})} {new Date(event.datetime_local).toLocaleDateString('en-US', {day: '2-digit'})}, {new Date(event.datetime_local).getFullYear()}</div>
                                                    <div>{new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(event.datetime_local))}</div>
                                                    
                                            </div>
                                            <div class="event-location">
                                                {event.venue.address} {event.venue.extended_address}
                                            </div>
                                        </section>
                                    </article>
                            </div>
                        )}
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
        <Footer/>

        </>
    )
}

export default SearchEvent;
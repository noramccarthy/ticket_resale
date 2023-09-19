import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import AdminNavbar from './AdminNavbar';
import '../css/SearchEvent.css'


const SearchEvent = props => {
    const [searchInput, setSearchInput] = useState("");
    const [events, setEvents] = useState([]);


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

    return (
        <>
        <AdminNavbar/>

        <div className='container'>
            {/* SEARCHBAR */}
            <div className='searchbar'>
                <form onSubmit={handleSubmit}>
                    <FaSearch id="search-icon" className='search-icon'/>
                    <input
                        type="text"
                        className='searchbar'
                        placeholder="Search a performer..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <button type='submit' className='submit-button'>Search</button>
                </form>
            </div>


            {/* EVENTS */}
            {events.length > 0 ? (
                <div className='events-container'>
                    {events.map((event) => 
                        <div key={event.id} className='each-event'>
                            <Link to={'/admin/create/' + event.id}>
                                {event.title}
                            </Link>
                            

                            <div className='each-event-detail'>
                                <p>Date: {event.datetime_local} </p>
                                <p>{event.venue.city}, {event.venue.state}</p>
                                <p>{event.venue.name} </p>
                            </div>

                        </div>
                    )}
                </div>

            ) : (
                <p>No upcoming shows</p>
            )}

        </div>
        </>
    )
}
export default SearchEvent;
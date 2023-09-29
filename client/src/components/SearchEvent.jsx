import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import '../css/SearchEvent.css'

const PAGE_SIZE = 10;

const SearchEvent = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [select, setSelect] = useState("");
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showButton, setShowButton] = useState(false);


    // auto scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight / 2) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };
    const handleScrollTop = () => {
        window.scrollTo({ top: 800, behavior: "smooth" });
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // pagination
    const totalPages = Math.ceil(
        events.filter((event) => !select || event.title.includes(select)).length /
        PAGE_SIZE
    );
    const pages = Array.from(Array(totalPages).keys());
    
    // changePage
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 800);
    }

    // get list of paginated events
    const paginatedEvents = [...events]
        // .filter((event) => !select || event.title.includes(select))
        .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

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
        const element = document.getElementById('results');
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <section>
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
            
            <div className='space'></div>

            <section className ='section-2'>
                <div className='space'></div>
                    {paginatedEvents.length > 0 ? (
                        <div> 
                            <section className='events-container' id='results'>
                                {paginatedEvents.map((event) => (
                                    <div key={event.id} className='each-event'>
                                        <Link to={'/admin/create/' + event.id} className='event-link'>
                                            <article class="event-card">
                                                <section className='event-date'>
                                                    <div className='event-time'><span>{new Date(event.datetime_local).toLocaleDateString('en-US', {day: '2-digit'})} {new Date(event.datetime_local).toLocaleDateString('en-US', {month: 'short'})} {new Date(event.datetime_local).getFullYear()}</span><span>{new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(event.datetime_local))}</span></div>
                                                </section>
        
                                                <section className="event-info">
                                                    <div className='event-title'>{event.title}</div>
                                                    <div className="event-venue">{event.venue.name}</div>
                                                    <div className="event-location">{event.venue.display_location}</div>
                                                </section>
                                            </article>
                                        </Link>
                                    </div>
                                ))}
        
                                {showButton && (
                                    <button className="scroll-top-button" onClick={handleScrollTop}><i className="arrow up"></i></button>
                                )}
                            </section>
        
                            <div className="pagination">
                                {pages.map((pageNumber) => (
                                <button key={pageNumber} className={`page-number${pageNumber === currentPage ? ' active' : ''}`} onClick={() => changePage(pageNumber)}>
                                    {pageNumber + 1}
                                </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        null
                    )}
                <Footer/>
            </section>
        </section>

    )
}

export default SearchEvent;
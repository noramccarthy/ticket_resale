import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext'
import FilterBar from './FilterBar';
import '../css/AllTickets.css'


const Deals = () => {
    const [tickets, setTickets] = useState([]);
    const [filterTickets, setFilterTickets] = useState(tickets);
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const { addToCart, cartItems} = useContext(CartContext);

    
    const handleSearchChange = (searchInput) => {
        const filteredSearchTickets = tickets.filter(item => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toString().toLowerCase());
        })
    
        setFilterTickets(filteredSearchTickets)
    }

    const handleCategoryChange = (category) => {
        const filteredCategoryTickets = tickets.filter(item => {
            // ticket.category === category.categoryName
            if (item.category === category) {
                return item;
            }
        })

        setFilterTickets(filteredCategoryTickets)
    }

    const handleStateChange = (state) => {
        const filteredStateTickets = tickets.filter(item => {
            // ticket.state === state.stateName
            if (item.state === state) {
                return item;
            }
        })

        setFilterTickets(filteredStateTickets)
    }

    // discounted price
    const getDiscountPrice = (ticket) => {
        if(ticket.onSale && ticket.discount > 0) {
            return ticket.price - ticket.discount
        } else {
            return ticket.price
        }
    }

    // addToCart function
    const addToCartHandler = (ticket) => {
        addToCart(ticket);
    }

    // check stock
    const stockReached = (ticket) => {
        if (!cartItems) return false;
        const ticketInCart = cartItems.find((item) => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock - 1;
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket/deals")
        .then((res) => {
            setTickets(res.data)
            setFilterTickets(res.data)
            // console.log(res.data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axios.get("http://localhost:8000/api/category")
        .then((res) => {
            setCategories(res.data.categories)
            console.log(res.data.categories)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axios.get("http://localhost:8000/api/state")
        .then((res) => {
            setStates(res.data.states)
            console.log(res.data.states)
        })
        .catch((err) => console.log(err))
    },[])


    return (
        <>
        <section id="tickets-scroll" className='tickets-container'>
            <div className='navbar-sticky'>
                <Navbar/>
            </div>

            <h1 className='ticket-filter-title mt-5'> All tickets </h1>
        </section>
        
        {/* container */}
        <div className='all-tickets-body-container'>
            {/* filter bar */}
            <div className='filter-bar'>
                <FilterBar
                    categories={categories}
                    onSearchFilter={handleSearchChange}
                    onCategoryFilter={handleCategoryChange}
                    states={states}
                    onStateFilter={handleStateChange}
                />
            </div>

            {/* tickets */}
            {filterTickets.length > 0 ? (
            <div className='filtered-tickets-container'>
                {filterTickets.map((ticket) => (
                    <div key={ticket._id} className='one-ticket'>
                        <Link to={'/one/ticket/' + ticket._id}>
                            <img className='ticket-image' src={ticket.image} alt="Placeholder"/>
                        </Link>

                        <div className='ticket-text'>
                            <h6 className='ticket-title'>
                                <Link to={'/one/ticket/' + ticket._id}>{ticket.artist}</Link>
                            </h6>

                            {ticket.onSale && ticket.discount > 0 ? (
                                <div>
                                    <h6 className='ticket-price-discount'>
                                        <span className='onsale-ticket'>
                                            ${ticket.price.toFixed(2)}
                                        </span>
                                            ${getDiscountPrice(ticket).toFixed(2)}
                                    </h6>
                                </div>
                            ) : (
                                <h6 className='ticket-price'>${ticket.price.toFixed(2)}</h6>
                            )}

                            <button className='ticket-addToCart' onClick={() => addToCartHandler(ticket)} disabled={stockReached(ticket)}>
                                {stockReached(ticket) ? "No tickets left" : "Add to cart"}
                            </button>

                        </div>
                    </div>
                ))}

            </div>
            ) : (
                <p className='empty-category'>No Tickets</p>
            )}
        </div>
        </>
    )
}

export default Deals;
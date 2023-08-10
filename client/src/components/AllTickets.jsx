import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext'
import FilterBar from './FilterBar';
import Ticket from './Ticket';
import '../css/AllTickets.css'
import Footer from './Footer';


const AllTickets = () => {
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
            // ticket.category === category.seatgeekName
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
        return ticketInCart && ticketInCart.quantity >= ticket.stock;
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket")
        .then((res) => {
            setTickets(res.data)
            setFilterTickets(res.data)
            console.log(res.data)
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
            <div className='navbar-sticky'><Navbar/></div>
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
                        <Ticket 
                            ticket = {ticket}
                            discount = {getDiscountPrice}
                            cart = {addToCartHandler}
                            stock = {stockReached}
                        />
                    </div>
                ))}

            </div>
            ) : (
                // no tickets
            <div className='filtered-tickets-container'>
                    <p className='empty-category'>No Tickets</p>
            </div>
            )}
        </div>

        <Footer/>
        </>
    )
}

export default AllTickets;
import api from '../services/api';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext'
import FilterBar from './FilterBar';
import Ticket from './Ticket';
import '../css/AllTickets.css'
import Layout from './Layout';

const PAGE_SIZE = 20;

const Sports = () => {
    const [tickets, setTickets] = useState([]);
    const [filterTickets, setFilterTickets] = useState(tickets);
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [select, setSelect] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const { addToCart, cartItems} = useContext(CartContext);

    // pagination
    const totalPages = Math.ceil(
        filterTickets.filter((ticket) => !select || ticket.includes(select)).length /
        PAGE_SIZE
    );
    const pages = Array.from(Array(totalPages).keys());
    
    // changePage
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 800);
    }

    // get list of paginated events
    const paginatedTickets = [...filterTickets]
        .filter((ticket) => !select || ticket.includes(select))
        .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

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

    // check stock
    const stockReached = (ticket) => {
        if (!cartItems) return false;
        const ticketInCart = cartItems.find((item) => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock;
    }

    useEffect(() => {
        api.get("/ticket/sports")
        .then((res) => {
            setTickets(res.data)
            setFilterTickets(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        api.get("/category")
        .then((res) => {
            setCategories(res.data.categories)
            console.log(res.data.categories)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        api.get("/state")
        .then((res) => {
            setStates(res.data.states)
            console.log(res.data.states)
        })
        .catch((err) => console.log(err))
    },[])

    return (
        <Layout>
            <div className='body-container'>
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
                {paginatedTickets.length > 0 ? (
                    <div> 
                        <div className='filtered-tickets-container'>
                            {paginatedTickets.map((tickets) => (
                                <div key={tickets._id} className='one-ticket'>
                                    <Ticket 
                                        ticket = {tickets}
                                        discount = {getDiscountPrice}
                                        stock = {stockReached}
                                    />
                                </div>
                            ))}
                        </div>
    
                        <div className="pagination-bar">
                            <div className='pagination'>
                                {pages.map((pageNumber) => (
                                <button key={pageNumber} className={`page-number${pageNumber === currentPage ? ' active' : ''}`} onClick={() => changePage(pageNumber)}>
                                    {pageNumber + 1}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    ) : (
                    // no tickets
                    <div className='filtered-tickets-container'>
                            <p className='empty-category'>No Tickets</p>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Sports;
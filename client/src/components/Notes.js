// AllTickets

import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { CartContext } from '../context/CartContext'
import {Search} from 'react-bootstrap-icons';
import Searchbar from './Searchbar';
import '../css/AllTickets.css'


const AllTickets = () => {
    const [input, setInput] = useState("");
    const [tickets, setTickets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [select, setSelect] = useState("");
    const { addToCart, cartItems} = useContext(CartContext);

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

    const filteredTickets = [...tickets]
        .filter((ticket) => !select || ticket.category.includes(select))


    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket")
        .then((res) => {
            setTickets(res.data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axios.get("http://localhost:8000/api/category")
        .then((res) => {
            setCategories(res.data.categories)
        })
        .catch((err) => console.log(err))
    },[])

    const updateInput = async(input) => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.artist.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setTickets(searchedTickets);
    }

    return (
        <>
        <section id="tickets-scroll" className='tickets-container'>
            <div className='navbar-sticky'>
                <NavBar/>
            </div>

            {/* filter by category */}
            <div className='all-tickets'>
                <h1 className='ticket-filter-title'> Search all tickets </h1>
                <div className='all-tickets-container d-flex justify-content-around'>
                    <div>
                        <select className='select' onChange={(e) => setSelect(e.target.value)}>
                            <option value=""> Filter By Category </option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.categoryName}>
                                        {category.categoryName}
                                    </option>
                                    ))
                                }
                        </select>
                    </div>

                    <div>
                        <Searchbar tickets={tickets}/>
                    </div>

                </div>
            </div>
        </section>

        {/* tickets */}
        {filteredTickets.length > 0 ? (
        <section className='filtered-tickets-container'>
            {filteredTickets.map((ticket,index) => (
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

        </section>
        ) : (
            <p className='empty-category'>Category Empty</p>
        )}
        </>
    )
}

export default AllTickets;


// Searchbar

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {Search} from 'react-bootstrap-icons';
import '../css/Searchbar.css';


const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [tickets, setTickets] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket")
        .then((res) => {
            setTickets(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    },[])


    const onChangeHandler = (searchValue) => {

        setSearchInput(searchValue);

        if (searchInput !== '') {
            const filteredTickets = tickets.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });

            setFilteredResults(filteredTickets);
            console.log(filteredResults)

        } else {
            setFilteredResults(tickets)
            console.log(filteredResults)
        }
    }



    return (
        <>
        <input
            type="text"
            className='searchbar'
            placeholder="Artist, event, team"
            name="search" 
            // value={searchInput}
            onChange={(e) => onChangeHandler(e.target.value)}
        />

        <div>
                {searchInput.length > 0 ? (
                    filteredResults.map((ticket,index) => (
                        <div key={ticket._id}>
                            {ticket.artist}
                        </div>
                    ))) : (null)}
        </div>
        
        </>

    )
    
}

export default Searchbar;
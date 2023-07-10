import axios from 'axios';
import '../css/LandingPage.css'

import Slider from 'react-slick'

// slick-carousel for css and font
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ScrollTrigger from 'react-scroll-trigger';

import NavBar from '../components/Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const LandingPage = () => {
    const navigate = useNavigate;
    const [tickets, setTickets] = useState([]);
    const { addToCart, cartItems } = useContext(CartContext);
    const [animate, setAnimate] = useState(false);

    // slider carasoul
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 4,  slidesToScroll: 1 ,responsive: [ {breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1,},},{breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1,},},],};


    // check if ticket is in stock
    const isInStock = (ticket) => {
        if (!cartItems) return false;

        const ticketInCart = cartItems.find((item) => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock -1;
    };

    // const discountedTickets = tickets.filter((ticket) => 
    // ticket.onSale && ticket.discount > 0.00);


    useEffect(() => {
        axios.get("http://localhost:8000/api/ticket")
        .then((res) => {
            setTickets(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    return (
        <>
        <div className="main-body">
            <span className='empty_body_span'></span>

            {/* FIX SEARCH BAR IN NAV */}
            <NavBar/>
            
            <div className='body'>
                <div className="container-header">
                    <div className='containerLink'>
                        <h6 className='title'> A marketplace</h6>
                        <h6 className='title'> where fans buy and sell </h6>
                        <h6 className='title'> tickets at a reasonable price</h6>
                    </div>

                    <Link className='link_to_deals' to={"/shop"}><button className='shop-button'>Shop Tickets</button> </Link> 

                </div>
            </div>
    
        <section className={`section-one ${animate ? 'animate' : 'slide-in'}`}>

            {/* carousel */}
            <div className="carousel-container">
                <h1 className='category-title'> Shop discounted tickets</h1>
                    <Slider {...settings}>
                        {tickets.map((ticket, index) => (
                        <div className='carousel-body' key={index}>
                            <Link className='link_image_carasoul' to={`/ticket/${ticket._id}`}>
                                <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                            </Link>

                            <h6 className='ticket-title'>
                                <Link to={`/ticket/${ticket._id}`}>{ticket.artist}</Link>
                            </h6>

                            <div className="carousel-price">
                                {/* original price */}
                                <h6 className="carousel-original-price">{`$${ticket.price}`} </h6>
                                <i class="fa-solid fa-arrow-right"></i>
                                {/* discounted price */}
                                <h6 className="carousel-discount-price">{`$${(ticket.price - ticket.disscount).toFixed(2)}`}</h6>
                            </div>

                            <button
                                className='carousel-btn'
                                onClick={() => addToCart(ticket)}
                                disabled={isInStock(ticket)}>
                                {isInStock(ticket) ? "Out of Stock" : "Add to Cart!"}
                            </button>
                        </div>
                    ))}
                    </Slider>
                    <Link className='deals' to={"/deals"}><button className='carousel-button'>Find Deals</button> </Link> 
            </div>

            {/* concerts */}
            <div className="carousel-container">
                <p className='category-title'> concerts </p>
                    <Slider {...settings}>
                        {tickets.map((ticket, index) => (
                        <div className='carousel-body' key={index}>
                            <Link className='link_image_carasoul' to={`/ticket/${ticket._id}`}>
                                <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                            </Link>

                            <h6 className='ticket-title'>
                                <Link to={`/ticket/${ticket._id}`}>{ticket.artist}</Link>
                            </h6>

                        </div>
                    ))}
                    </Slider>
            </div>

            {/* sports */}
            <div className="carousel-container">

                <p className='category-title'> sports </p>
                    <Slider {...settings}>
                        {tickets.map((ticket, index) => (
                        <div className='carousel-body' key={index}>
                            <Link className='link_image_carasoul' to={`/ticket/${ticket._id}`}>
                                <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                            </Link>

                            <h6 className='ticket-title'>
                                <Link to={`/ticket/${ticket._id}`}>{ticket.artist}</Link>
                            </h6>
                        </div>
                    ))}
                    </Slider>
            </div>

            {/* comedy & theater */}
            <div className="carousel-container">
                <p className='category-title'> comedy & theater </p>
                    <Slider {...settings}>
                        {tickets.map((ticket, index) => (
                        <div className='carousel-body' key={index}>
                            <Link className='link_image_carasoul' to={`/ticket/${ticket._id}`}>
                                <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                            </Link>

                            <h6 className='ticket-title'>
                                <Link to={`/ticket/${ticket._id}`}>{ticket.artist}</Link>
                            </h6>

                        </div>
                    ))}
                    </Slider>
            </div>

        </section>


        </div>
        </>
    )
}

export default LandingPage;
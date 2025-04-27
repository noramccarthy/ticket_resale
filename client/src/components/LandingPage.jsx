import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import Slider from 'react-slick'
import Carousel from './Carousel';
import SlideShow from './SlideShow';
import '../css/LandingPage.css'
import Chatbot from './Chatbot';
import Layout from './Layout';
import SearchBar from './SearchBar';

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [concerts, setConcerts] = useState([]);
    const [sports, setSports] = useState([]);
    const [theater, setTheater] = useState([]);
    const { addToCart, cartItems } = useContext(CartContext);
    const [animate, setAnimate] = useState(false);

    const settings = { 
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 4,  
        slidesToScroll: 1,
        responsive: [ {breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1,},},{breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1,},},],};
        
    // check if ticket is in stock
    const isInStock = (ticket) => {
        if (!cartItems) return false;

        const ticketInCart = cartItems.find((item) => item._id === ticket._id);
        return ticketInCart && ticketInCart.quantity >= ticket.stock -1;
    };

    useEffect(() => {
        api.get("/ticket/concerts")
        .then((res) => {
            setConcerts(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        api.get("/ticket/sports")
        .then((res) => {
            setSports(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        api.get("/ticket/theater")
        .then((res) => {
            setTheater(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    return (
        <Layout>
            <div className="main-body">
                <SearchBar/>

                <SlideShow/>
                <section className={`section-one ${animate ? 'animate' : 'slide-in'}`}>
                    <div className="carousel-container">
                        <h1 className='category-title'>Concerts</h1>
                            <Slider {...settings}>
                                {concerts.map((ticket, index) => (
                                    <div className='carousel-body' key={index}>
                                        <Carousel
                                            ticket={ticket}
                                            addToCart={addToCart}
                                            isInStock={isInStock}
                                        />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                    <div className="carousel-container">
                        <h1 className='category-title'>Sports</h1>
                            <Slider {...settings}>
                                {sports.map((ticket, index) => (
                                    <div className='carousel-body' key={index}>
                                        <Carousel
                                            ticket={ticket}
                                            addToCart={addToCart}
                                            isInStock={isInStock}
                                        />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                    <div className="carousel-container">
                        <h1 className='category-title'>Theater</h1>
                            <Slider {...settings}>
                                {theater.map((ticket, index) => (
                                    <div className='carousel-body' key={index}>
                                        <Carousel
                                            ticket={ticket}
                                            addToCart={addToCart}
                                            isInStock={isInStock}
                                        />
                                    </div>
                                ))}
                            </Slider>
                    </div>
                </section>
                
            </div>
            <div className='chatbot-toggle'>
                {isOpen && <Chatbot/>}
            </div>
        </Layout>
    )
}

export default LandingPage;
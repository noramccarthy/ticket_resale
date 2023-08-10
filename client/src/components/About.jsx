import axios from 'axios';
import '../css/About.css'

import NavBar from '../components/Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Footer from './Footer';

const LandingPage = () => {
    const navigate = useNavigate;

    return (
        <>
        <div className="main-body">
            <span className='empty_body_span'></span>

            {/* FIX SEARCH BAR IN NAV */}
            <NavBar/>

        <section className="third-landing-page-container">
            <h1 className="third-page-title">What we offer</h1>
            <h6 className='third-page-text'>
                
                <p>Change of plans? Sell your tickets at face value or at a discount.</p>

                <p>Looking for plans? Buy tickets from fans at a reasonable price.</p>
                
                <p>Here at Ticket Forum, you are safe from scams and ridiculous resale prices.</p>

                <p>Whether you're in the mood for a concert, sports game, comedy show or play, we have the tickets for you.</p>

            </h6>
        </section>
        </div>
        <Footer/>
        </>
    )
}

export default LandingPage;
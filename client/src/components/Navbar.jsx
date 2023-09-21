import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Badge } from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import tfLogo from '../assets/images/tfLogo.png';

import '../css/Navbar.css';

const Navbar = () => {
    const { cartCount } = useContext(CartContext);

    return (
        <>
        <nav className="nav">
            <div className="nav-row">

                <div span="6" className='nav-col'>
                    {/* LOGO */}
                    <div className="logo">
                        <Link to={"/"}> <img className='logo-img' require src={tfLogo} alt="Logo pic" /> Ticket Forum</Link>
                    </div>
                </div>

                <div span="6" className='nav-col-end'>
                    {/* LINKS */}
                    <div>
                        <ul className="nav-links">
                            <Link className="link-btn" to={"/about"}>About</Link>
                            <Link className="link-btn" to={'/shop'}>Shop</Link>
                            <Link className="link-btn" to={"/deals"}>Deals</Link>
                            <Link className="link-btn" to={"/admin/dashboard"}>Account</Link>
                        </ul>
                    </div>

                    {/* CART */}
                    <div className="signup">
                        <li className="signup__primary" style={{ position: 'relative' }}>
                            <Link className="a__primary" to={"/cart"}>
                                <Badge color="primary" badgeContent={cartCount}>
                                    <ShoppingCartIcon color="black"/>
                                </Badge>
                            </Link>
                        </li>
                    </div>

                </div>
                
            </div>
        </nav>

        </>
    )

}

export default Navbar;
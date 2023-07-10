import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import { CartContex } from '../context/CartContext';
// import { Badge } from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import tfLogo from '../assets/images/tfLogo.png';

import '../css/Navbar.css';

const Navbar = ({searchInput, handleSearchChange}) => {
    // const { cartCount } = useContext(CartContex);

    return (
        <>
        <nav className="nav-container">
            <div className="nav-row">

                <div span="6" className='nav-col'>
                    {/* LOGO */}
                    <div className="logo">
                        <Link to={"/"}> <img className='logo_img' require src={tfLogo} alt="Logo pic" /> Ticket Forum</Link>
                    </div>

                    {/* SEARCH BAR */}
                    {/* <div className='searchbar-container'>
                        <input
                            type="text"
                            className='searchbar'
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div> */}
                </div>

                <div span="6" className='nav-col-end'>
                    {/* LINKS */}
                    <div>
                        <ul className="nav_links">
                            <Link className="link-btn" to={"/about"}>About</Link>
                            <Link className="link-btn" to={'/shop'}>Shop</Link>
                            <Link className="link-btn" to={"/deals"}>Deals</Link>
                            <Link className="link-btn" to={"/admin/login"}>Sign in</Link>
                        </ul>
                    </div>

                    {/* CART */}
                    <div className="signup">
                        <li className="signup__primary" style={{ position: 'relative' }}>
                            <Link className="a__primary" to={"/ticket/cart"}>
                                <ShoppingCartIcon color="primary"/>

                            </Link>
                            {/* {cartCount > 0 && <span className="cart-count">{cartCount}</span>} */}


                            {/* <div>
                                <Badge color="secondary" badgeContent={cartCount}>
                                    <ShoppingCartIcon/>
                                </Badge>
                            </div> */}
                            
                        </li>
                    </div>

                </div>
                
            </div>
        </nav>

        </>
    )

}

export default Navbar;
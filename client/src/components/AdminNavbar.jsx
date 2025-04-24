import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import tfLogo from '../assets/images/tfLogo.png';
import '../css/Navbar.css';

const AdminNavbar = () => {
    const { cartCount } = useContext(CartContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    return (
        <>
        <nav className="nav">
            <div className="nav-row">
                <div span="6" className='nav-col'>
                    <div className="logo">
                        <Link to={"/"}> <img className='logo-img' require src={tfLogo} alt="Logo pic" /> Ticket Forum</Link>
                    </div>
                </div>

                <div span="6" className='nav-col-end'>
                    <div>
                        <ul className="nav-links">
                            <Link className="link-btn" to={'/shop'}>Shop</Link>
                            <Link className="link-btn" to={"/deals"}>Deals</Link>


                            {/* <Link className="link-btn" to={"/admin/dashboard"}>Account</Link> */}
                            <div 
                                className="dropdown" 
                                onMouseEnter={() => setDropdownOpen(true)} 
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                            <button className="link-btn dropdown-toggle">Account</button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/admin/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/admin/events" className="dropdown-item">New Listing</Link>
                                    <Link to="/admin/tickets" className="dropdown-item">Your Listings</Link>
                                    <Link to="/admin/logout" className="dropdown-item">Logout</Link>
                                </div>
                            )}
                        </div>
                        </ul>
                    </div>

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

export default AdminNavbar;
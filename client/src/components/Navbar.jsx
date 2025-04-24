import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import tfLogo from '../assets/images/tfLogo.png';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
    const { cartCount } = useContext(CartContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="nav">
            <div className="nav-row">
                <div className='nav-col'>
                    <div className="logo">
                        <Link to={"/"}>
                            <img className='logo-img' src={tfLogo} alt="Logo pic" /> Ticket Forum
                        </Link>
                    </div>
                </div>

                <div className='nav-col-end'>
                    <ul className="nav-links">
                        <li><Link className="link-btn" to="/about">About</Link></li>
                        <li><Link className="link-btn" to="/shop">Shop</Link></li>
                        <li><Link className="link-btn" to="/deals">Deals</Link></li>

                        <li className="dropdown"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button className="link-btn dropdown-toggle">Account</button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    {isLoggedIn ? (
                                        <>
                                            <Link to="/admin/profile" className="dropdown-item">Profile</Link>
                                            <Link to="/admin/events" className="dropdown-item">New Listing</Link>
                                            <Link to="/admin/tickets" className="dropdown-item">Your Listings</Link>
                                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/admin/login" className="dropdown-item">Login</Link>
                                            <Link to="/admin/register" className="dropdown-item">Register</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                        <li className="signup__primary" style={{ position: 'relative' }}>
                            <Link className="a__primary" to={"/cart"}>
                                <Badge color="primary" badgeContent={cartCount}>
                                    <ShoppingCartIcon color="black"/>
                                </Badge>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
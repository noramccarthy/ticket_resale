import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import tfLogo from '../assets/images/tfLogo.png';
import '../css/Navbar.css';

const AdminNavbar = () => {
    const { cartCount } = useContext(CartContext);
    const navigate = useNavigate();

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                // console.log(res);
                navigate("/admin/login")
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                    {/* LINKS */}
                    <div>
                        <ul className="nav-links">
                            <Link className="link-btn" to={'/shop'}>Shop</Link>
                            <Link className="link-btn" to={"/deals"}>Deals</Link>
                            <Link className="link-btn" to={"/admin/events"}>New listing</Link>
                            <Link className="link-btn" to={"/admin/dashboard"}>Dashboard</Link>
                            <Link className="link-btn" to={"/admin/login"} onClick={logout}>Logout</Link>
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

export default AdminNavbar;
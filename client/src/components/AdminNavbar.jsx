import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import tfLogo from '../assets/images/tfLogo.png';
import '../css/AdminNavbar.css';

const AdminNavbar = () => {
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

        <nav className="nav-container">
            <div className="nav-row">

                <div span="6" className='nav-col'>
                    {/* LOGO */}
                    <div className="logo">
                        <Link to={"/"}> <img className='logo_img' require src={tfLogo} alt="Logo pic" /> Ticket Forum</Link>
                    </div>

                </div>

                <div span="6" className='nav-col-end'>
                    {/* LINKS */}
                    <div>
                        <ul className="nav_links">
                            <Link className="link-btn" to={'/shop'}>Shop</Link>
                            <Link className="link-btn" to={"/deals"}>Deals</Link>
                            <Link className="link-btn" to={"/admin/events"}>New listing</Link>

                            <Link className="link-btn" to={"/admin/login"} onClick={logout}>Logout</Link>

                        </ul>
                    </div>

                    {/* CART */}
                    <div className="signup">
                        <li className="signup__primary" style={{ position: 'relative' }}>
                            <Link className="a__primary" to={"/ticket/cart"}>
                                

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

export default AdminNavbar;
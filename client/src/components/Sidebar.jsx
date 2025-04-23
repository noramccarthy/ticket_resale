import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                navigate("/admin/login")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="d-flex">
            <nav className={`sidebar d-flex flex-column flex-shrink-0 position-fixed ${collapsed ? 'collapsed' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                </button>

                <div className="nav flex-column">
                    {/* Dashboard Link */}
                    <NavLink
                        to="/admin/dashboard"
                        className="sidebar-link text-decoration-none p-3"
                        activeClassName="active"
                    >
                        <i className="fas fa-home me-3"></i>
                        <span className="hide-on-collapse">Dashboard</span>
                    </NavLink>

                    {/* Profile Link */}
                    <NavLink
                        to="/admin/profile"
                        className="sidebar-link text-decoration-none p-3"
                        activeClassName="active"
                    >
                        <i className="fas fa-user-circle me-3"></i>
                        <span className="hide-on-collapse">Profile</span>
                    </NavLink>

                    {/* Listings Link */}
                    <NavLink
                        to="/admin/tickets"
                        className="sidebar-link text-decoration-none p-3"
                        activeClassName="active"
                    >
                        <i className="fas fa-ticket-alt me-3"></i>
                        <span className="hide-on-collapse">Listings</span>
                    </NavLink>

                    {/* Create Link */}
                    <NavLink
                        to="/admin/events"
                        className="sidebar-link text-decoration-none p-3"
                        activeClassName="active"
                    >
                        <i className="fas fa-plus-square me-3"></i>
                        <span className="hide-on-collapse">Create</span>
                    </NavLink>

                    {/* Logout Link */}
                    <Link
                        to="/admin/login"
                        className="sidebar-link text-decoration-none p-3"
                        onClick={logout}
                    >
                        <i className="fas fa-sign-out-alt me-3"></i>
                        <span className="hide-on-collapse">Logout</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
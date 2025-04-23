import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import '../css/AdminDashboard.css'
import Sidebar from './Sidebar';

const AdminDashboard = (props) => {


    return (
        <>
        <AdminNavbar/>
        <Sidebar/>

            <main className="main-content">
                <div className="container-fluid">
                    <h2>Welcome Back!</h2>
                    <p className="text-muted">Streamline your workflow with our intuitive dashboard.</p>
                </div>
            </main>
        <Footer/>
        </>
    )
}


export default AdminDashboard;
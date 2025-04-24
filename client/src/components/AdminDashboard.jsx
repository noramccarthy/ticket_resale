import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../css/AdminDashboard.css'
import Navbar from './Navbar';

const AdminDashboard = (props) => {

    return (
        <div className='admin-container'>
            <Navbar/>
                <main className="admin-content">
                    <div className="container-fluid">
                        <h2>Welcome Back!</h2>
                        <p className="text-muted">Streamline your workflow with our intuitive dashboard.</p>
                    </div>
                </main>
            <Footer/>
        </div>
        
    )
}


export default AdminDashboard;
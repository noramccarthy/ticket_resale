import React, { useState, useEffect } from 'react';
import '../css/AdminDashboard.css'
import Layout from './Layout';

const AdminDashboard = (props) => {

    return (
        <Layout>
            <div className='admin-container'>
                    <main className="admin-content">
                        <div className="container-fluid">
                            <h2>Welcome Back!</h2>
                            <p className="text-muted">Streamline your workflow with our intuitive dashboard.</p>
                        </div>
                    </main>
            </div>
        </Layout>
        
    )
}


export default AdminDashboard;
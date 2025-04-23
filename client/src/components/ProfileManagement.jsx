import React, { useState, useEffect, useContext } from 'react';
import '../css/ProfileManagement.css'
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const ProfileManagement = () => {

    return (
        <>
        <AdminNavbar/>
        <Sidebar/>
        <div class="container py-5">
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-0">
                            <div class="row g-0">
                        
                                {/* <!-- Content Area --> */}
                                <div class="col-lg-9">
                                    <div class="p-4">
                                        {/* <!-- Personal Information --> */}
                                        <div class="mb-4">
                                            <h5 class="mb-4">Personal Information</h5>
                                            <div class="row g-3">
                                                <div class="col-md-6">
                                                    <label class="form-label">First Name</label>
                                                    <input type="text" class="form-control" value="Alex"/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Last Name</label>
                                                    <input type="text" class="form-control" value="Johnson"/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Email</label>
                                                    <input type="email" class="form-control" value="alex.johnson@example.com"/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Phone</label>
                                                    <input type="tel" class="form-control" value="+1 (555) 123-4567"/>
                                                </div>
                                                <div class="col-12">
                                                    <label class="form-label">Bio</label>
                                                    <textarea class="form-control" rows="4">Product designer with 5+ years of experience in creating user-centered digital solutions. Passionate about solving complex problems through simple and elegant designs.</textarea>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Settings Cards --> */}
                                        <div class="row g-4 mb-4">
                                            <div class="col-md-6">
                                                <div class="settings-card card">
                                                    <div class="card-body">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 class="mb-1">Two-Factor Authentication</h6>
                                                                <p class="text-muted mb-0 small">Add an extra layer of
                                                                    security</p>
                                                            </div>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox" checked/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="settings-card card">
                                                    <div class="card-body">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 class="mb-1">Email Notifications</h6>
                                                                <p class="text-muted mb-0 small">Receive activity updates
                                                                </p>
                                                            </div>
                                                            <div class="form-check form-switch">
                                                                <input class="form-check-input" type="checkbox" checked/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileManagement;
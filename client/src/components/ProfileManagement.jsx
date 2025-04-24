import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/ProfileManagement.css'
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const ProfileManagement = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/user", {withCredentials:true})
        .then(res => {
            setUser(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            navigate("/admin/login")
            console.log("Error:", err);
        })
    },[navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({...prev, [name]: value }));
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            // save changes
            axios.put("http://localhost:8000/api/user/update", user, { withCredentials: true })
            .then(() => {
                alert("Profile updated successfully!");
                setIsEditing(false);
            })
            .catch(err => {
                console.log("Update error:", err);
                alert("Error updating profile.")
            });
        } else {
            setIsEditing(true);
        }
    };

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
                                <div class="col-lg-9">
                                    <div class="p-4">
                                        <div class="mb-4">
                                            <h5 class="mb-4">Personal Information</h5>
                                            <div class="row g-3">
                                                <div class="col-md-6">
                                                    <label class="form-label">First Name</label>
                                                    {isEditing ? (
                                                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} />
                                                    ) : ( 
                                                        <p className='form-control'>{user.firstName}</p>
                                                    )}
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Last Name</label>
                                                        {isEditing ? (
                                                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} />
                                                        ) : ( 
                                                            <p className='form-control'>{user.lastName}</p>
                                                        )}
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Email Address</label>
                                                        {isEditing ? (
                                                            <input type="text" className="form-control" name="email" value={user.email} onChange={handleChange} />
                                                        ) : ( 
                                                            <p className='form-control'>{user.email}</p>
                                                        )}
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Phone Number</label>
                                                        {isEditing ? (
                                                            <input type="text" className="form-control" name="phone" value={user.phone} onChange={handleChange} />
                                                        ) : ( 
                                                            <p className='form-control'>{user.phone || '-'}</p>
                                                        )}
                                                </div>
                                                <div className="mt-4">
                                                    <button className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`} onClick={handleToggleEdit}>
                                                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

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
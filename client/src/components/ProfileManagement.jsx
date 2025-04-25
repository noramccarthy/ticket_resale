import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/ProfileManagement.css';
import Layout from './Layout';

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
        axios.get("http://localhost:8000/api/user", { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                navigate("/admin/login");
                console.log("Error:", err);
            });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            axios.put("http://localhost:8000/api/user/update", user, { withCredentials: true })
                .then(() => {
                    alert("Profile updated successfully!");
                    setIsEditing(false);
                })
                .catch(err => {
                    console.log("Update error:", err);
                    alert("Error updating profile.");
                });
        } else {
            setIsEditing(true);
        }
    };

    return (
        <Layout>
            <div className="profile-container mt-5">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <h5 className="user-name">{user.firstName} {user.lastName}</h5>
                                        <h6 className="user-email">{user.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>About</h5>
                                        <p>This is your profile settings area. You can update your personal information and account preferences here.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-12">
                                        <h6 className="mb-3 text-primary">Personal Information</h6>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">First Name</label>
                                        {isEditing ? (
                                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} />
                                        ) : (
                                            <p className="form-control">{user.firstName}</p>
                                        )}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Last Name</label>
                                        {isEditing ? (
                                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} />
                                        ) : (
                                            <p className="form-control">{user.lastName}</p>
                                        )}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        {isEditing ? (
                                            <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
                                        ) : (
                                            <p className="form-control">{user.email}</p>
                                        )}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone</label>
                                        {isEditing ? (
                                            <input type="tel" className="form-control" name="phone" value={user.phone} onChange={handleChange} />
                                        ) : (
                                            <p className="form-control">{user.phone || '-'}</p>
                                        )}
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="row gutters">
                                    <div className="col-12">
                                        <h6 className="mb-3 text-primary">Account Settings</h6>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Preferred Language</label>
                                        <select className="form-select">
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                            <option value="de">Deutsch</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Time Zone</label>
                                        <select className="form-select">
                                            <option value="UTC-8">Pacific Time (PT)</option>
                                            <option value="UTC-5">Eastern Time (ET)</option>
                                            <option value="UTC+0">UTC</option>
                                            <option value="UTC+1">Central European Time (CET)</option>
                                        </select>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="row gutters">
                                    <div className="col-12">
                                        <h6 className="mb-3 text-primary">Change Password</h6>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                    <button type="button" className="btn btn-save" onClick={handleToggleEdit}>
                                        {isEditing ? "Save Changes" : "Edit Profile"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileManagement;

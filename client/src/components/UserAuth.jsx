import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginRegistration.css';
import tfLogo from '../assets/images/tfLogo.png';
import Layout from './Layout';
import { AuthContext } from '../context/AuthContext';

const UserAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        // Check if the user is already logged in by checking the token
        if (localStorage.getItem("token")) {
            navigate('/');
        }
    }, [navigate]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError({});
    }

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const url = isLogin 
            ? "http://localhost:8000/api/login"
            : "http://localhost:8000/api/register";

        axios.post(url, formData, { withCredentials: true })
            .then(res => {
                // update global auth state
                login(res.data.token); // store token and update the state
                navigate('/');
            })
            .catch(err => {
                setError(err.response?.data || { message: "An error occurred" });
            });
    }

    return (
        <Layout>
            <section className="bg-color">
                <div className="login-body">
                    <div className="card-container mt-5 mb-5">
                        <div className="ticket-card bg-white text-black">
                            <div className="card-body p-5">
                                <div className="form-header">
                                    <a href="/"><img className="logo-img mb-3" src={tfLogo} alt="companyLogo" /></a>
                                    <h2 className="form-title">{isLogin ? "Welcome back" : "Welcome"}</h2>
                                </div>
                                {error?.message && <p className="ticket_form_error_msg">{error.message}</p>}
                                <form onSubmit={onSubmitHandler} className="create-user-form">
                                    {!isLogin && (
                                        <>
                                            <div className="form-outline form-black mb-4">
                                                <label className="user-form-label" htmlFor="firstName">First name</label>
                                                <input type="text" name="firstName" className="form-control form-control-lg" value={formData.firstName} onChange={onChangeHandler} />
                                            </div>
                                            <div className="form-outline form-black mb-4">
                                                <label className="user-form-label" htmlFor="lastName">Last name</label>
                                                <input type="text" name="lastName" className="form-control form-control-lg" value={formData.lastName} onChange={onChangeHandler} />
                                            </div>
                                        </>
                                    )}

                                    <div className="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="email">Email address</label>
                                        <input type="email" name="email" className="form-control form-control-lg" value={formData.email} onChange={onChangeHandler} />
                                    </div>

                                    <div className="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control form-control-lg" value={formData.password} onChange={onChangeHandler} />
                                    </div>

                                    {!isLogin && (
                                        <div className="form-outline form-black mb-4">
                                            <label className="user-form-label" htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" name="confirmPassword" className="form-control form-control-lg" value={formData.confirmPassword} onChange={onChangeHandler} />
                                        </div>
                                    )}

                                    <button className="btn btn-outline-dark btn-lg px-4" type="submit">
                                        {isLogin ? "Login" : "Sign up"}
                                    </button>
                                </form>
                                <p className="mb-0 mt-5">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <button type="button" className="toggle-link" onClick={toggleForm}>
                                        {isLogin ? " Sign up" : " Login"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default UserAuth;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginRegistration.css'
import tfLogo from '../assets/images/tfLogo.png'

const UserForm = () => {
    const [userForm, setUserForm] = useState({
        email:"",
        password:"",
        confirmPassword:"",
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const handleUserForm = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", userForm, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setUserForm(res.data);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log("Error:", err);
            setError(err);
        })
    }

    return (
        <>
        <section className="bg-color">
            <div className="login-body mt-5">
                <div className="card-container">
                    <div className="ticket-card bg-white text-black">
                        <div className="card-body p-5">
                            <div className='mb-md-5 mt-md-4 pb-5'>

                            <a href="/"><img className='logo-img mb-3' require src={tfLogo} alt="companyLogo" /></a>
                                
                                <form onSubmit={handleUserForm} className='create-user-form'>
                                    <h2 className="fw-bold mb-5 text-uppercase">Welcome</h2>
                                    {error.email ? <p className='ticket_form_error_msg'>{error.email.message}</p> : null}

                                    <div class="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="email">Email address</label>
                                        <input 
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={userForm.email}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    {error.password ? <p className='ticket_form_error_msg'>{error.password.message}</p> : null}
                                    <div className="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            value={userForm.password}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    {error.confirmPassword ? <p className='ticket_form_error_msg'>{error.confirmPassword.message}</p> : null}
                                    <div className="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <input 
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control form-control-lg"
                                            value={userForm.confirmPassword}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <button className="btn btn-outline-dark btn-lg px-4" type="submit">Sign up</button>
                                </form>

                                <div>
                                    <p className="mb-0 mt-5">Already have an account? <a href="/admin/login" className="redirect">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default UserForm;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LoginRegistration.css'

const UserForm = () => {
    const [userForm, setUserForm] = useState({
        email:"",
        password:"",
        confirmPassword:""
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
            console.log(res)
            // check this
            setUserForm(res);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log(err.response.data.error.errors);
            setError(err.response.data.error.errors);
        })
    }

    return (
        <>
        <section className="vh-100 bg-image">
            <div className="login-container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                <form onSubmit={handleUserForm} className='create-user-form'>
                                    <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                                    <p className="text-white-50 mb-5">Please create your login and password!</p>

                                    {error.email ? <p className='ticket_form_error_msg'>{error.email.message}</p> : null}

                                    <div class="form-outline form-white mb-4">
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
                                    <div className="form-outline form-white mb-4">
                                        <label className="user-form-label" htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            value={userForm.password}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="user-form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <input 
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control form-control-lg"
                                            value={userForm.confirmPassword}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign up</button>

                                    <div>
                                        <p className="mb-0 mt-5">Already have an account? <a href="/admin/login" className="text-white-50 fw-bold">Login</a></p>
                                    </div>
                                </form>
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
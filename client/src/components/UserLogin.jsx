import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginRegistration.css'

const UserLogin = props => {
    const [userLogin, setUserLogin] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        props.setAuthorized("");
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const handleUserLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", userLogin, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setUserLogin(res.data);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log("Error:", err.response.data);
            setError(err.response.data);
        })
    }

    return (
        <>
        <section className="vh-100 bg-image">
            <div className="login-container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="ticket-card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                <h3 className='text-danger' style={{display:"inline"}}>{props.authorized}</h3>

                                <form onSubmit={handleUserLogin} className='create-user-form'>
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please login with your email and password</p>

                                    {error ? <p className='ticket_form_error_msg'>{error.message}</p> : null}

                                    <div class="form-outline form-white mb-4">
                                        <label className="user-form-label" htmlFor="email">Email address</label>
                                        <input 
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={userLogin.email}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="user-form-label" htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            value={userLogin.password}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    <div>
                                        <p className="mb-0 mt-5">Don't have an account? <a href="/admin/register" className="text-white-50 fw-bold">Sign up</a></p>
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
export default UserLogin;
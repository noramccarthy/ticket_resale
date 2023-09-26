import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginRegistration.css'
import tfLogo from '../assets/images/tfLogo.png'

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
        <section className="bg-color">
            <div className="login-body py-5 ">
                <div className="card-container">
                    <div className="ticket-card bg-white text-black">
                        <div className="card-body p-5">

                            <div className='unauthorized'>{props.authorized}</div>
                            
                            <div className="mb-md-5 mt-md-4 pb-5">

                                <a href="/"><img className='logo-img mb-3' require src={tfLogo} alt="companyLogo" /></a>

                                <form onSubmit={handleUserLogin} className='create-user-form'>
                                    <h2 className="fw-bold mb-5 text-uppercase">Welcome back</h2>
                                    {error ? <p className='ticket_form_error_msg'>{error.message}</p> : null}

                                    <div class="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="email">Email address</label>
                                        <input 
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={userLogin.email}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-outline form-black mb-4">
                                        <label className="user-form-label" htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            value={userLogin.password}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <button className="btn btn-outline-dark btn-lg px-4" type="submit">Login</button>
                                </form>

                                <div>
                                    <p className="mb-0 mt-5">Don't have an account? <a href="/admin/register" className="redirect">Sign up</a></p>
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
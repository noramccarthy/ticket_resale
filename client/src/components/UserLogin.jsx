import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
            // check this
            setUserLogin(res.data);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log(err.response.data);
            setError(err.response.data);
        })
    }

    return (
        <>
        <h1 className="text-danger" style={{display:"inline"}}>{props.authorized}</h1>

        <section className="vh-100 bg-image">
            <div className="login-container py-5 h-100">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">
                                
                                {error ? <p className='ticket_form_error_msg'>{error.message}</p> : null}

                                <form onSubmit={handleUserLogin} className='create-user-form'>
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">enter email and password</p>

                                    <div className="form-outline form-white mb-4">
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
                                        <p className="mb-0 mt-5">Don't have an account? <a href="/admin/register" className="text-white-50 fw-bold">Sign Up</a></p>
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
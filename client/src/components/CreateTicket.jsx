import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/TicketForm.css'

const CreateTicket = props => {

    const [allCategories, setAllCategories] = useState([])
    const [allStates, setAllStates] = useState([])

    const [ticketForm, setTicketForm] = useState({
        artist: "",
        date: "",
        location: "",
        state: "",
        price: 0,
        category: "",
        stock: 0,
        image: "",
        onSale: false,
        discount: 0
    })

    
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setTicketForm({...ticketForm, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/category")
        .then(res => {
            console.log(res.data);
            setAllCategories(res.data.categories);
        })
        .catch( err => {
            console.log(err)
            // props.setAuthorized("Please log in.");
            // navigate("/admin/login")
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/state")
        .then(res => {
            console.log(res.data.states);
            setAllStates(res.data.states);
        })
        .catch( err => {
            console.log(err)
            // props.setAuthorized("Please log in.");
            // navigate("/admin/login")
        })
    }, [])


    const handleTicketForm = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/ticket", ticketForm, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setTicketForm(res.data);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log(err);
            setError(err.response);
        })
    }

    return (
        <>
        <section className="vh-100 bg-image">
            <div className="create-container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                {/* ERRORS HERE */}

                                <form onSubmit={handleTicketForm} className='create-ticket-form'>
                                    <p className="text-white-50 mb-5">List your tickets</p>

                                    {/* {error.artist ? <p className='ticket_form_error_msg'>{error.artist.message}</p> : ""} */}

                                    <div class="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="artist">Artist</label>
                                        <input 
                                            type="text"
                                            name="artist"
                                            className="form-control form-control-lg"
                                            value={ticketForm.artist}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    {/* {error.date ? <p className='ticket_form_error_msg'>{error.date.message}</p> : ""} */}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="password">Date</label>
                                        <input 
                                            type="date"
                                            name="date"
                                            className="form-control form-control-lg"
                                            value={ticketForm.date}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    {/* {error.location ? <p className='ticket_form_error_msg'>{error.location.message}</p> : ""} */}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="location">Location</label>
                                        <input 
                                            type="text"
                                            name="location"
                                            className="form-control form-control-lg"
                                            value={ticketForm.location}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    {/* {error.state ? <p className='ticket_form_error_msg'>{error.state.message}</p> : ""} */}

                                    <div className="form-group">
                                        <label className="ticket-form-label" htmlFor="category">State</label>
                                        <select className="ticket-form-category-select" name="state" onChange={onChangeHandler}>
                                            <option value="none" selected disabled>Select State</option>
                                            {
                                                allStates.map(state => {
                                                    return (
                                                        <option value={state.stateName}>{state.stateName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {/* {error.price ? <p className='ticket_form_error_msg'>{error.price.message}</p> : ""} */}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="location">Price</label>
                                        <input 
                                            type="number"
                                            name="price"
                                            className="form-control form-control-lg"
                                            value={ticketForm.price}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="ticket-form-label" htmlFor="category">Category</label>
                                        <select className="ticket-form-category-select" name="category" onChange={onChangeHandler}>
                                            <option value="none" selected disabled>Select Category</option>
                                            {
                                                allCategories.map(category => {
                                                    return (
                                                        <option value={category.categoryName}>{category.categoryName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    {/* {error.stock ? <p className='ticket_form_error_msg'>{error.stock.message}</p> : ""} */}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="location">Stock</label>
                                        <input 
                                            type="number"
                                            name="stock"
                                            className="form-control form-control-lg"
                                            value={ticketForm.stock}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="location">Image</label>
                                        <input 
                                            type="text"
                                            name="image"
                                            className="form-control form-control-lg"
                                            value={ticketForm.image}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="onSale">On sale?</label>
                                        <input
                                            type="checkbox"
                                            name="onSale"
                                            checked={ticketForm.onSale}
                                            onChange={() => setTicketForm({...ticketForm, onSale: !ticketForm.onSale})}
                                        />
                                    </div>

                                    {ticketForm.onSale ? (
                                        <div className="form-outline form-white mb-4">
                                            <label className="ticket-form-label" htmlFor="discount">Discount</label>
                                            <input 
                                                type="number"
                                                name="discount"
                                                className="form-control form-control-lg"
                                                value={ticketForm.discount}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                        ) : null
                                    }

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">List</button>

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
export default CreateTicket;
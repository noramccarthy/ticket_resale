import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/TicketForm.css'


const TicketForm = (props) => {
    const {onSubmitProp, category, artist, date, location, state, image, newPrice, newStock, newOnSale, newDiscount, lat, lon, address, city, error, postedBy, id} = props;

    // state for controllable user input for CreateTicket and UpdateTicket
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [onSale, setOnSale] = useState(false);
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    // delete confirmation modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // submit handler for CreateTicket and UpdateTicket
    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({category, artist, date, location, state, image, price, stock, onSale, discount, lat, lon, address, city});
    }

    // delete from backend
    const deleteTicket = (ticketId) => {
        axios.delete("http://localhost:8000/api/ticket/delete/" + ticketId)
            .then(() => {
                console.log("Successfully delete ticket from DB")
                navigate('/admin/dashboard')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // const removeFromDom = (ticketId) => {
    //     setAdminTickets(adminTickets.filter(ticket => ticket._id !== ticketId))
    // }


    return (
        <>
        <section className="vh-100 bg-image">
            <div className="create-container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                <form onSubmit={onSubmitHandler} className='create-ticket-form'>
                                    <p className="text-white-50 mb-5">List your tickets</p>

                                    <div className="form-outline">
                                        <input 
                                            type="hidden"
                                            name="lat"
                                            value={lat}
                                        />
                                    </div>

                                    <div className="form-outline">
                                        <input 
                                            type="hidden"
                                            name="lon"
                                            value={lon}
                                        />
                                    </div>

                                    <div className="form-outline">
                                        <input 
                                            type="hidden"
                                            name="address"
                                            value={address}
                                        />
                                    </div>

                                    <div className="form-outline">
                                        <input 
                                            type="hidden"
                                            name="city"
                                            value={city}
                                        />
                                    </div>

                                    <div className="form-outline">
                                        <input 
                                            type="hidden"
                                            name="category"
                                            value={category}
                                        />
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="artist">Artist</label>
                                        <input 
                                            type="text"
                                            name="artist"
                                            className="form-control form-control-lg"
                                            value={artist}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="password">Date</label>
                                        <input 
                                            type="text"
                                            name="date"
                                            className="form-control form-control-lg"
                                            value={date}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="location">Location</label>
                                        <input 
                                            type="text"
                                            name="location"
                                            className="form-control form-control-lg"
                                            value={location}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="state">State</label>
                                        <input 
                                            type="text"
                                            name="state"
                                            className="form-control form-control-lg"
                                            value={state}
                                        />
                                    </div>

                                    {error.price ? <p className='ticket_form_error_msg'>{error.price.message}</p> : ""}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="price">Price</label>
                                        <input 
                                            type="number"
                                            name="price"
                                            className="form-control form-control-lg"
                                            placeholder={newPrice}
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    {error.stock ? <p className='ticket_form_error_msg'>{error.stock.message}</p> : ""}

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="stock">Stock</label>
                                        <input 
                                            type="number"
                                            name="stock"
                                            className="form-control form-control-lg"
                                            placeholder={newStock}
                                            value={stock}
                                            onChange={(e) => {setStock(e.target.value)}}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input 
                                            type="hidden"
                                            name="event.image"
                                            className="form-control form-control-lg"
                                            value={image}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="ticket-form-label" htmlFor="onSale">On sale?</label> 
                                        <input
                                            type="checkbox"
                                            name="onSale"
                                            placeholder={newOnSale}
                                            checked={onSale}
                                            onChange={(e) => {setOnSale(!onSale)}}
                                        />
                                    </div>

                                    {onSale ? (
                                        <div className="form-outline form-white mb-4">
                                            <label className="ticket-form-label" htmlFor="discount">Discount</label>
                                            <input 
                                                type="number"
                                                name="discount"
                                                className="form-control form-control-lg"
                                                placeholder={newDiscount}
                                                value={discount}
                                                onChange={(e) => {setDiscount(e.target.value)}}
                                            />
                                        </div>
                                        ) : null
                                    }

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">List</button>

                                    <div>
                                        {postedBy ? (
                                            <button className='btn delete-ticket' onClick={() => deleteTicket(id)}>Delete</button>
                                        ): (
                                            null
                                        )}
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
export default TicketForm;
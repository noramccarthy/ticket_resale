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

    return (
        <section className="bg-image d-flex align-items-center" style={{ minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white w-100">
                    <div className="card-body p-5 text-center">
                        <form onSubmit={onSubmitHandler} className="create-ticket-form">
                        <h5 className="text-white-50 mb-3">List your tickets</h5>

                        {/* Hidden fields */}
                        <input type="hidden" name="lat" value={lat} />
                        <input type="hidden" name="lon" value={lon} />
                        <input type="hidden" name="address" value={address} />
                        <input type="hidden" name="city" value={city} />
                        <input type="hidden" name="category" value={category} />
                        <input type="hidden" name="event.image" value={image} />

                        {/* Form Fields */}
                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="artist">Artist</label>
                            <input type="text" name="artist" className="form-control form-control-lg" value={artist} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="date">Date</label>
                            <input type="text" name="date" className="form-control form-control-lg" value={date} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="location">Location</label>
                            <input type="text" name="location" className="form-control form-control-lg" value={location} />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="state">State</label>
                            <input type="text" name="state" className="form-control form-control-lg" value={state} />
                        </div>

                        {error.price && <p className="ticket-form-error-msg">{error.price.message}</p>}
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

                        {error.stock && <p className="ticket-form-error-msg">{error.stock.message}</p>}
                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="stock">Stock</label>
                            <input
                            type="number"
                            name="stock"
                            className="form-control form-control-lg"
                            placeholder={newStock}
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="onSale">On sale?</label> &nbsp;
                            <input
                            type="checkbox"
                            name="onSale"
                            checked={onSale}
                            onChange={() => setOnSale(!onSale)}
                            />
                        </div>

                        {onSale && (
                            <div className="form-outline form-white mb-4">
                            <label className="ticket-form-label" htmlFor="discount">Discount</label>
                            <input
                                type="number"
                                name="discount"
                                className="form-control form-control-lg"
                                placeholder={newDiscount}
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            </div>
                        )}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            {postedBy && (
                                <button
                                className="btn delete-btn"
                                onClick={() => deleteTicket(id)}
                                >
                                Delete
                                </button>
                            )}
                            <button className="btn list-btn" type="submit">
                                List
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
export default TicketForm;
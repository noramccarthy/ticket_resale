import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/TicketForm.css'


const TicketForm = (props) => {
    const {onSubmitProp, category, artist, date, location, state, image, newPrice, newStock, newOnSale, newDiscount, lat, lon, address, city, error, postedBy, id, newSection, newRow, newSeat} = props;

    // state for controllable user input for CreateTicket and UpdateTicket
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [onSale, setOnSale] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [section, setSection] = useState("");
    const [row, setRow] = useState("");
    const [seat, setSeat] = useState("");
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // delete confirmation modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newErrors = {};
    
        if (!section) newErrors.section = "Section is required";
        if (!row) newErrors.row = "Row is required";
        if (!seat) newErrors.seat = "Seat is required";
        if (!price) newErrors.price = "Price is required";
        if (!stock) newErrors.stock = "Stock is required";
        if (!agree) {newErrors.agree = "You must agree to the terms";}
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            onSubmitProp({
                category,
                artist,
                date,
                location,
                state,
                image,
                price,
                stock,
                onSale,
                discount,
                lat,
                lon,
                address,
                city,
                section,
                row,
                seat
            });
        }
    };

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
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                        <div className="card bg-white text-black w-100">
                            <div className="card-body p-5">
                                <form onSubmit={onSubmitHandler} className="create-ticket-form">
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <h6 className="text-center mb-4" style={{ color: '#E04A34', fontWeight: '600' }}>Your Event</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="ticket-form-label">Artist</label>
                                            <input type="text" name="artist" className="form-control" value={artist} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="ticket-form-label">Date</label>
                                            <input type="text" name="date" className="form-control" value={date} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="ticket-form-label">Location</label>
                                            <input type="text" name="location" className="form-control" value={location} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="ticket-form-label">State</label>
                                            <input type="text" name="state" className="form-control" value={state} readOnly />
                                        </div>

                                        <div className="col-12">
                                            <h6 className="text-center mb-2 mt-4" style={{ color: '#E04A34', fontWeight: '600' }}>Where are you sitting?</h6>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="ticket-form-label">Section</label>
                                            <input type="text" className="form-control" value={section} onChange={(e) => setSection(e.target.value)} />
                                            {errors.section && <small className="text-danger">{errors.section}</small>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="ticket-form-label">Row</label>
                                            <input type="text" className="form-control" value={row} onChange={(e) => setRow(e.target.value)} />
                                            {errors.row && <small className="text-danger">{errors.row}</small>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="ticket-form-label">Seat</label>
                                            <input type="text" className="form-control" value={seat} onChange={(e) => setSeat(e.target.value)} />
                                            {errors.seat && <small className="text-danger">{errors.seat}</small>}
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="ticket-form-label mt-4" style={{ color: '#E04A34', fontWeight: '600' }}>How many tickets are you selling?</h6>
                                            <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                                            {errors.stock && <small className="text-danger">{errors.stock}</small>}
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="ticket-form-label mt-4" style={{ color: '#E04A34', fontWeight: '600' }}>How much did you pay per ticket?</h6>
                                            <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            {errors.price && <small className="text-danger">{errors.price}</small>}
                                        </div>

                                        <div className="mb-5 col-md-6 d-flex align-items-end">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="onSale"
                                                    checked={onSale}
                                                    onChange={() => setOnSale(!onSale)}
                                                />
                                                <h6 className="form-check-label" htmlFor="onSale" style={{ color: '#E04A34', fontWeight: '600' }}>Sell at a discounted price</h6>
                                            </div>
                                        </div>

                                        {onSale && (
                                            <div className="col-md-6">
                                                <h6 className="ticket-form-label" style={{ color: '#E04A34', fontWeight: '600' }}>Discounted price:</h6>
                                                <input
                                                    type="number"
                                                    name="discount"
                                                    className="form-control"
                                                    value={discount}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                    disabled={!onSale}
                                                />
                                            </div>
                                        )}

                                        <div className="form-check d-flex align-items-start">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="agreement"
                                                checked={agree}
                                                onChange={(e) => setAgree(e.target.checked)}
                                                style={{ flexShrink: 0, width: '18px', height: '18px'}}
                                            />
                                            <label
                                                className="form-check-label ms-3"
                                                htmlFor="agreement"
                                                style={{ maxWidth: '700px', textAlign: 'left', fontSize: '0.95rem' }}
                                            >
                                                I acknowledge that a valid payment method must be on file. I understand that if the tickets I list are sold and I am unable to produce them, or if they are determined to be fraudulent, my card may be charged to reimburse the buyer.
                                            </label>
                                        </div>

                                        <div className="col-12 d-flex mt-4">
                                            {postedBy && (
                                                <button className="cancel-btn me-3" onClick={() => deleteTicket(id)}>
                                                    Delete
                                                </button>
                                            )}
                                            <button className="list-btn ms-auto" type="submit" disabled={!agree}>
                                                List
                                            </button>
                                        </div>
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
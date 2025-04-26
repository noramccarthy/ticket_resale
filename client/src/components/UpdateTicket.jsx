import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import TicketForm from './TicketForm';
import Layout from './Layout';
import '../css/TicketForm.css';

const UpdateTicket = props => {
    const {id} = useParams();
    const [ticketForm, setTicketForm] = useState({});
    const [ticket, setTicket] = useState({});
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/ticket/" + id, {withCredentials: true})
        .then(res => {

            console.log("Data:", res.data)
            setTicket(res.data)

            const date = new Date(res.data.date);
            const dateString = date.toLocaleString();
            console.log(dateString)
            setDate(dateString)

        })
        .catch(err => {
            props.setAuthorized("Please Login First")
            navigate("/admin/login")
            console.log("Error:", err)
        })
    }, [id])

    const updateTicket = ticketForm => {
        axios.put("http://localhost:8000/api/admin/ticket/" + id, ticketForm, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setTicketForm(res.data);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            console.log(err.response.data.error.errors);
            setError(err.response.data.error.errors);
        })
    }

    return (
        <Layout>
            <div className='ticket-form-container'>
                <div>
                    <TicketForm
                        onSubmitProp={updateTicket}
                        category={ticket.category}
                        artist={ticket.artist}
                        date={date}
                        location={ticket.location}
                        state={ticket.state}
                        image={ticket.image}
                        newPrice={ticket.price}
                        newStock={ticket.stock}
                        newOnSale={ticket.onSale}
                        newDiscount={ticket.discount}
                        lat={ticket.lat}
                        lon={ticket.lon}
                        address={ticket.address}
                        city={ticket.city}
                        postedBy={ticket.postedBy}
                        id={ticket._id}
                        error={error}
                        section={ticket.section}
                        row={ticket.row}
                        seat={ticket.seat}
                    />
                </div>
            </div>
        </Layout>
    )
}
export default UpdateTicket;
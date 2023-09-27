import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams} from 'react-router-dom';
import TicketForm from './TicketForm';
import '../css/TicketForm.css'

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
        <>

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
                error={error}
            />
        </div>

        </>
    )
}
export default UpdateTicket;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams} from 'react-router-dom';
import TicketForm from './TicketForm';
import '../css/TicketForm.css'

const CreateTicket = props => {
    const {id} = useParams();
    const [ticketForm, setTicketForm] = useState({});
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [onSale, setOnSale] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [category, setCategory] = useState("");
    const [artist, setArtist] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://api.seatgeek.com/2/events/" + id + "?client_id=MjkzNzI3MDF8MTY4OTAyMjc0MC40MTAxMDc2")
        .then(res => {
            console.log("Data:", res.data)
            setCategory(res.data.type)
            setArtist(res.data.title)
            
            const date = new Date(res.data.datetime_local);
            const dateString = date.toLocaleString();
            console.log(dateString)
            setDate(dateString)

            setLocation(res.data.venue.name)
            setState(res.data.venue.state)
            setImage(res.data.performers[0].image)
        })
        .catch(err => {
            console.log("Error:", err)
        })
    }, [id])

    const createTicket = ticketForm => {
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

        <div>
            <TicketForm
                onSubmitProp={createTicket}
                category={category}
                artist={artist}
                date={date}
                location={location}
                state={state}
                image={image}
                newPrice={price}
                newStock={stock}
                newOnSale={onSale}
                newDiscount={discount}
            />
        </div>

        </>
    )
}
export default CreateTicket;
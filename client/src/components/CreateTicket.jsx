import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { useNavigate, useParams} from 'react-router-dom';
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
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState({});
    const [section, setSection] = useState("");
    const [row, setRow] = useState("");
    const [seat, setSeat] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://api.seatgeek.com/2/events/" + id + "?client_id=MjkzNzI3MDF8MTY4OTAyMjc0MC40MTAxMDc2")
        .then(res => {
            setCategory(res.data.taxonomies[0].name)
            setArtist(res.data.title)
            const date = new Date(res.data.datetime_local);
            const dateString = date.toLocaleString();
            setDate(dateString)
            setLocation(res.data.venue.name)
            setState(res.data.venue.state)
            setImage(res.data.performers[0].image)
            setLon(res.data.venue.location.lon)
            setLat(res.data.venue.location.lat)
            setAddress(res.data.venue.address)
            setCity(res.data.venue.city)
        })
        .catch(err => {
            console.log("Error:", err)
        })
    }, [id])

    const createTicket = ticketForm => {
        api.post("/ticket", ticketForm, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setTicketForm(res.data);
            navigate('/admin/listings')
        })
        .catch(err => {
            console.log(err.response.data.errors);
            setError(err.response.data.errors);
        })
    }

    return (
        <div className='ticket-form-container'>
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
                    lat={lat}
                    lon={lon}
                    address={address}
                    city={city}
                    error={error}
                    section={section}
                    row={row}
                    seat={seat}
                />
            </div>
        </div>
    )
}
export default CreateTicket;
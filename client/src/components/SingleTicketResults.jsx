import { Link, useNavigate } from 'react-router-dom';
import '../css/SingleTicketResults.css'

const SingleTicketResults = ({ticket}) => {
    const date = new Date(ticket.date)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const day = date.toLocaleDateString('en-US', {day: '2-digit'})
    const year = date.getFullYear();
    const time = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(ticket.date))
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleListClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            alert('You must be logged in to list tickets!');
        }
    };

    return (
        <tr className="inner-box">
            <th scope="row">
                <div className="event-date">
                    <span>{day}</span>
                    <p>{month}</p>
                </div>
            </th>
            <td>
                <div className="event-img">
                    <img src={ticket.image} alt={ticket.artist} />
                </div>
            </td>
            <td>
                
                <div className="event-wrap">
                    <span>{ticket.artist}</span>
                </div>
            </td>
            <td>
                <div className="r-no">
                    <div>
                        <span style={{ display: 'block' }}>{ticket.location}</span>
                        <span style={{ display: 'block' }}>{ticket.city}, {ticket.state}</span>
                    </div>
                </div>
            </td>
            <td>
                <div className="primary-btn">
                    <Link className="view-btn" to={`/ticket/${ticket._id}`}>View</Link>
                </div>
            </td>
        </tr>
    )
}

export default SingleTicketResults;
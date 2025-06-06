import { Link } from 'react-router-dom';
import '../css/SingleTicket.css'

const SingleTicket = ({ticket}) => {
    const date = new Date(ticket.date)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const day = date.toLocaleDateString('en-US', {day: '2-digit'})

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
                        <span>{ticket.sold ? 'Sold' : 'Available'}</span>
                </div>
            </td>
            <td>
                <div>
                    <Link className="view-btn" to={`/ticket/${ticket._id}`}>View</Link>
                    <Link className="edit-btn" to={`/admin/update/${ticket._id}`}>Edit</Link>
                </div>
            </td>
        </tr>
    )
}

export default SingleTicket;
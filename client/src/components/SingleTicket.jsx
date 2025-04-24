import { Link } from 'react-router-dom';
// import '../css/AdminDashboard.css'

const SingleTicket = ({ticket}) => {
    const date = new Date(ticket.date)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const day = date.toLocaleDateString('en-US', {day: '2-digit'})
    const year = date.getFullYear();
    const time = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(ticket.date))

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
                    <div className="meta">
                        <div className="organizers">
                            {ticket.price}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="r-no">
                    <span>{ticket.artist}</span>
                </div>
            </td>
            <td>
                <div className="primary-btn">
                    <Link className="btn btn-primary" to={`/admin/update/${ticket._id}`}>Edit</Link>
                </div>
            </td>
        </tr>
    )
}

export default SingleTicket;
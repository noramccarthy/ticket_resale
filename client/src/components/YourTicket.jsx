import '../css/AdminDashboard.css'
import { Link } from 'react-router-dom';
import '../css/YourTicket.css'

const YourTicket = ({ticket}) => {

    const date = new Date(ticket.date)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const day = date.toLocaleDateString('en-US', {day: '2-digit'})
    const year = date.getFullYear();

    const time = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric'}).format(new Date(ticket.date))

    return (
        <>
        <div class="your-ticket-container">
            <article class="your-ticket-card">
                <section className='your-ticket-date'>
                    <div className='your-ticket-time'>
                        <span>{day}</span><span>{month}</span>
                    </div>
                </section>

                <section class="your-ticket-info">
                    <div className='your-ticket-artist'>
                        <div>{ticket.artist}</div>
                    </div>

                    <div class="your-ticket-dates">
                            <div>{month} {day}, {year}</div>
                            <div>{time}</div>
                    </div>
                    <div class="your-ticket-location">
                        {ticket.location}
                    </div>
                    <Link className='update-link' to={`/admin/update/${ticket._id}`}> Update</Link>
                </section>
            </article>
        </div>
        </>
    )
}

export default YourTicket;
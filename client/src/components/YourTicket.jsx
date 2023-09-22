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
        <div class="single-card">
            <div class="row">
                <article class="card fl-left">
                    <section class="date">
                        <time datetime="23th feb">
                        <span>{day}</span><span>{month}</span>
                        </time>
                    </section>

                    <section class="card-cont">
                        <h3>{ticket.artist}</h3>

                        <div class="event-date">
                            {/* <i class="fa fa-calendar"></i> */}
                            <time>
                                <span>{month} {day}, {year}</span>
                                <span>{time}</span>

                            </time>
                        </div>

                        <div class="event-info">
                            {/* <i class="fa fa-map-marker"></i> */}
                            <p>
                                {ticket.location}
                            </p>
                        </div>

                        <Link className='link' to={`/admin/update/${ticket._id}`}> Update</Link>

                    </section>
                </article>
            </div>
        </div>
        </>
    )
}

export default YourTicket;
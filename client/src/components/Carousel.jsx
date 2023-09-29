import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import '../css/Carousel.css'


const Carousel = ({ticket, addToCart, isInStock}) => {

        return (
            <>
                <div className="one-carousel-container">
                    <Link className='carousel-pic' to={`/ticket/${ticket._id}`}>
                            <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                    </Link>

                    <div className='ticket-title-container'>
                        <Link to={`/ticket/${ticket._id}`} className="carousel-ticket-artist">{ticket.artist}</Link>
                    </div>

                    <div className="prices">
                        {ticket.onSale && ticket.discount > 0 ? (
                                <div className='carousel-price'>
                                    <h6 className="carousel-original-price">${ticket.price.toFixed(2)} </h6>
                                    <h6 className="carousel-discount-price">
                                        ${(ticket.price - ticket.discount).toFixed(2)}
                                    </h6>
                                </div>
                        ) : (
                            <h6 className="carousel-discount-price">${ticket.price.toFixed(2)} </h6>
                        )}
                    </div>

                    {/* <button
                        className='carousel-btn'
                        onClick={() => addToCart(ticket)}
                        disabled={isInStock(ticket)}>
                        {isInStock(ticket) ? "Out of Stock" : "Add to Cart"}
                    </button> */}

                </div>
            </>
        )
}

export default Carousel;
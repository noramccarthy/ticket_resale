import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import '../css/Carousel.css'


const Carousel = ({ticket, addToCart, isInStock}) => {

        return (
            <>
                <Link className='link_image_carasoul' to={`/ticket/${ticket._id}`}>
                        <img className="carousel-pic" src={ticket.image} alt={ticket.artist} />
                </Link>

                <h6 className='ticket-title'>
                    <Link to={`/ticket/${ticket._id}`}>{ticket.artist}</Link>
                </h6>

                {ticket.onSale && ticket.discount > 0 ? (
                    <div>
                        <div className='carousel-price'>
                            <h6 className="carousel-original-price">${ticket.price} </h6>
                            <h6 className="carousel-discount-price">
                                ${(ticket.price - ticket.discount).toFixed(2)}
                            </h6>
                        </div>

                    </div>
                ) : (
                    <h6 className="carousel-discount-price">{`$${ticket.price}`} </h6>
                )}

                <button
                    className='carousel-btn'
                    onClick={() => addToCart(ticket)}
                    disabled={isInStock(ticket)}>
                    {isInStock(ticket) ? "Out of Stock" : "Add to Cart"}
                </button>
            
            </>
        )
}

export default Carousel;
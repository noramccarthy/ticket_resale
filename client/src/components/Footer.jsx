import { Link } from 'react-router-dom'
import tfLogo from '../assets/images/tfLogo.png'
import '../css/Footer.css'

const Footer = () => {

    return (
        <div className="footer-container">
            <div div className='footer-links'>
                    <Link className='footer-links-color' to={'/shop'}>Shop</Link>
                    <Link className='footer-links-color' to={'/deals'}>Deals</Link>
                    
                    <Link to="/">
                        <img src={tfLogo} className='footer-logo-img' alt="Company Logo" />
                    </Link>

                    <Link className="footer-links-color" to={"/about"}>About Us</Link>
                    <Link className='footer-links-color' to={'/cart'}>Cart</Link>
            </div>
            <div className='footer-info'>
                <p>© 2025 Ticket Forum</p>
            </div>
        </div>
    )
}

export default Footer;
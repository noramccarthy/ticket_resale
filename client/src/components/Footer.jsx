import { Link } from 'react-router-dom'
import tfLogo from '../assets/images/tfLogo.png'
import '../css/Footer.css'

const Footer = () => {

    return (
        <div className="footer-container">
            <div div className='footer-links'>
                <div className="divide">
                    <Link className='footer-links-color' to={'/shop'}>Shop</Link>
                </div>

                <div className="divide">
                    <Link className='footer-links-color' to={'/deals'}>Deals</Link>
                </div>

                <div className="footer-logo">
                    <a href="/"><img className='logo-img' require src={tfLogo} alt="companyLogo" /></a>
                </div>
                
                <div className="divide">
                    <Link className="footer-links-color" to={"/about"}>About Us</Link>
                </div>

                <div className="divide">
                    <Link className='footer-links-color' to={'/cart'}>Cart</Link>
                </div>
            </div>

            <div className='footer-info'>
                <p>© 2023 Ticket Forum</p>
            </div>
        </div>
    )
}

export default Footer;
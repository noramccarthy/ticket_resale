import '../css/About.css';
import Layout from './Layout';
import { FaTicketAlt, FaHandshake, FaShieldAlt, FaSmile } from 'react-icons/fa';

const About = () => {
    return (
        <Layout>
            <section className="about-page-container">
                <div className="about-page-title">Why TicketForum?</div>
                <div className="about-cards-container">
                    <div className="about-card">
                        <FaTicketAlt className="about-icon" />
                        <h3>Sell with Ease</h3>
                        <p>Change of plans? Sell your tickets at face value or a discount quickly and safely.</p>
                    </div>
                    <div className="about-card">
                        <FaHandshake className="about-icon" />
                        <h3>Buy with Confidence</h3>
                        <p>Find tickets from real fans at reasonable prices — no crazy fees.</p>
                    </div>
                    <div className="about-card">
                        <FaShieldAlt className="about-icon" />
                        <h3>Safe & Secure</h3>
                        <p>We protect you from scams and ridiculous resale practices.</p>
                    </div>
                    <div className="about-card">
                        <FaSmile className="about-icon" />
                        <h3>Any Event, Anytime</h3>
                        <p>Concerts, sports, comedy shows, plays — we’ve got your tickets ready.</p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default About;

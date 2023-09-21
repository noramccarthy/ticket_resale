import NavBar from '../components/Navbar';
import Footer from './Footer';
import '../css/About.css'

const About = () => {
    return (
        <>
        <div className="main-body">

            <NavBar/>

            <section className="about-page-container">
                <h1 className="about-page-title">What we offer</h1>
                <h6 className='about-page-text'>
                    
                    <p>Change of plans? Sell your tickets at face value or at a discount.</p>

                    <p>Looking for plans? Buy tickets from fans at a reasonable price.</p>
                    
                    <p>Here at Ticket Forum, you are safe from scams and ridiculous resale prices.</p>

                    <p>Whether you're in the mood for a concert, sports game, comedy show or play, we have the tickets for you.</p>

                </h6>
            </section>
        </div>
        <Footer/>
        </>
    )
}

export default About;
import './hero.scss'; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
    return (
        <div>
            <h1>Mint Mate: Your NFT Ticket Hub</h1>
            <p>Mint your moment. Own your experience.</p>
            <div className="hero-buttons">
                <button className="signup-button">Sign Up</button>
                <button className="login-button">
                    <FontAwesomeIcon icon={faUser} /> Log In
                </button>
            </div>
        </div>
    );
};

export default Hero;

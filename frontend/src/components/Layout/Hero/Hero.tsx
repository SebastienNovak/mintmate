import './hero.scss'; // Your styling file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const HeroSection = () => {
    return (
        <div className="hero">
            <h1>Mint Mate: Your NFT Ticket Hub</h1>
            <p>Mint your moment. Own your experience.</p>
            <button className="signup-button">Sign Up</button>
            <button className="login-button">
                <FontAwesomeIcon icon={faUser} /> Log In
            </button>
        </div>
    );
};

export default HeroSection;

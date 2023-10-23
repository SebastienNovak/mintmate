import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import DiscoveryFeed from './components/SearchAndDiscover/DiscoveryFeed/DiscoveryFeed';
import Trending from './components/CommunityAndFan/Trending/Trending';
import Workshops from './components/EventAndExperience/Workshop/Workshop';
import Reviews from './components/Other/ReviewCard/ReviewCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import AOS from 'aos';
import 'aos/dist/aos.css'; 

import './App.scss';
import { useEffect } from 'react';

function App() {
    const navbarData = useSelector((state: RootState) => state.navbar);
    const discoveryData = useSelector((state: RootState) => state.discoveryFeed);
    const reviewData = useSelector((state: RootState) => state.reviewCard);

    useEffect(() => {
      AOS.init({
        duration: 1000
      });
    }, []);
    
    return (
        <div className="app">
            <Navbar data={navbarData} />
            <div className="content-container">
                <header className="hero">
                    <h1>Mint Mate: Your NFT Ticket Hub</h1>
                    <p>Mint your moment. Own your experience.</p>
                    <button className="signup-button">Sign Up</button>
                    <button className="login-button">
                      <FontAwesomeIcon icon={faUser} /> Log In
                    </button>
                </header>
                <div className='sections'>
                  <div className='trending-content'>
                    <section>
                        <h2>Trending</h2>
                        <Trending />
                    </section>
                  </div>
                  <div className='discovery-content'>
                    <section>
                        <DiscoveryFeed data={discoveryData} />
                    </section>
                  </div>
                  <div className='workshops-content'>
                    <section>
                        <h2>Workshops</h2>
                        <Workshops />
                    </section>
                  </div>
                  <div className='reviews-content'>
                    <section>
                        <h2>Reviews</h2>
                        {reviewData.map(singleReview => <Reviews key={singleReview.id} review={singleReview} />)}
                    </section>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;

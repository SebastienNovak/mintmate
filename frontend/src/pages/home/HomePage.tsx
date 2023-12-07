import { Suspense, lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Navbar from '../../components/Layout/Navbar/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './homePage.scss';
import Hero from '../../components/Layout/Hero/Hero';

const Trending = lazy(() => import('../../components/CommunityAndFan/Trending/Trending'));
const DiscoveryFeed = lazy(() => import('../../components/SearchAndDiscover/DiscoveryFeed/DiscoveryFeed'));
const Workshops = lazy(() => import('../../components/EventAndExperience/Workshop/Workshop'));
const Reviews = lazy(() => import('../../components/Other/ReviewCard/ReviewCard'));

function HomePage() {
    const navbarData = useSelector((state: RootState) => state.navbar);
    const discoveryData = useSelector((state: RootState) => state.discoveryFeed);
    const reviewData = useSelector((state: RootState) => state.reviewCard);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const renderSections = () => (
        <div className='sections'>
            <section className='trending-content'>
                <h2>Trending</h2>
                <Trending />
            </section>
            <section className='discovery-content'>
                <DiscoveryFeed data={discoveryData} />
            </section>
            <section className='workshops-content'>
                <h2>Workshops</h2>
                <Workshops />
            </section>
            <section className='reviews-content'>
                <h2>Reviews</h2>
                {reviewData.map(singleReview => (
                    <Reviews key={singleReview.id.toString()} review={singleReview} />
                ))}
            </section>
        </div>
    );

    return (
        <div className="app">
            <header className="header-container">
                <Navbar data={navbarData} />
            </header>
            <main className="content-container">
                <Hero />
                <Suspense fallback={<div>Loading...</div>}>
                    {renderSections()}
                </Suspense>
            </main>
            <footer className="footer-container">
                <Footer />
            </footer>
        </div>
    );
}

export default HomePage;

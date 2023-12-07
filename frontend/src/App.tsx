// import { Suspense, lazy, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
// import Navbar from './components/Layout/Navbar/Navbar';
// import Footer from './components/Layout/Footer/Footer';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './App.scss';
// import HomeTest from './pages/home/HomeTest';
import HomePage from './pages/home/HomePage';

// Lazy loaded components
// const Trending = lazy(() => import('./components/CommunityAndFan/Trending/Trending'));
// const DiscoveryFeed = lazy(() => import('./components/SearchAndDiscover/DiscoveryFeed/DiscoveryFeed'));
// const Workshops = lazy(() => import('./components/EventAndExperience/Workshop/Workshop'));
// const Reviews = lazy(() => import('./components/Other/ReviewCard/ReviewCard'));

function App() {
//     const navbarData = useSelector((state: RootState) => state.navbar);
//     const discoveryData = useSelector((state: RootState) => state.discoveryFeed);
//     const reviewData = useSelector((state: RootState) => state.reviewCard);

//     useEffect(() => {
//       AOS.init({
//         duration: 1000
//       });
//     }, []);

    return (
        // <div className="app">
        //     <header className="header-container">
        //       <Navbar data={navbarData} />
        //     </header>
        //     <main className="content-container">
        //         <header className="hero">
        //             <h1>Mint Mate: Your NFT Ticket Hub</h1>
        //             <p>Mint your moment. Own your experience.</p>
        //             <button className="signup-button">Sign Up</button>
        //             <button className="login-button">
        //               <FontAwesomeIcon icon={faUser} /> Log In
        //             </button>
        //         </header>
        //         <div className='sections'>
        //           <Suspense fallback={<div>Loading...</div>}>
        //             <div className='trending-content'>
        //               <section>
        //                   <h2>Trending</h2>
        //                   <Trending />
        //               </section>
        //             </div>
        //             <div className='discovery-content'>
        //               <section>
        //                   <DiscoveryFeed data={discoveryData} />
        //               </section>
        //             </div>
        //             <div className='workshops-content'>
        //               <section>
        //                   <h2>Workshops</h2>
        //                   <Workshops />
        //               </section>
        //             </div>
        //             <div className='reviews-content'>
        //               <section>
        //                   <h2>Reviews</h2>
        //                   {reviewData.map(singleReview => <Reviews key={singleReview.id} review={singleReview} />)}
        //               </section>
        //             </div>
        //           </Suspense>
        //         </div>
        //     </main>
        //     <footer className="footer-container">
        //       <Footer />
        //     </footer>
        <div>
          <HomePage />
        </div>
    );
}

export default App;

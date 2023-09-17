import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOnboarding, setBio, setPortfolioLink, selectOnboardingStep, selectOnboardingStatus } from '../../store/slices/onboarding/artistOnboardingSlice';

const ArtistOnboarding: React.FC = () => {
    const dispatch = useDispatch();
    const onboardingStep = useSelector(selectOnboardingStep);
    const status = useSelector(selectOnboardingStatus);
    
    const [name, setName] = useState('');
    const [bio, setBioValue] = useState('');
    const [portfolioLink, setPortfolioLinkValue] = useState('');

    const handleSubmitName = () => {
        dispatch(startOnboarding(name));
    };

    const handleSubmitBio = () => {
        dispatch(setBio(bio));
    };

    const handleSubmitPortfolio = () => {
        dispatch(setPortfolioLink(portfolioLink));
    };

    return (
        <div className="artist-onboarding">
            {onboardingStep === 'start' && (
                <div>
                    <label>Enter your name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                    <button onClick={handleSubmitName}>Next</button>
                </div>
            )}
            
            {onboardingStep === 'bio' && (
                <div>
                    <label>Enter your bio:</label>
                    <textarea value={bio} onChange={(e) => setBioValue(e.target.value)} />
                    <button onClick={handleSubmitBio}>Next</button>
                </div>
            )}
            
            {onboardingStep === 'portfolio' && (
                <div>
                    <label>Enter your portfolio link:</label>
                    <input value={portfolioLink} onChange={(e) => setPortfolioLinkValue(e.target.value)} />
                    <button onClick={handleSubmitPortfolio}>Complete</button>
                </div>
            )}

            {onboardingStep === 'completed' && (
                <div>
                    Thank you for completing the onboarding process!
                </div>
            )}

            {status === 'error' && (
                <div className="error">
                    There was an error with the onboarding process. Please try again later.
                </div>
            )}
        </div>
    );
};

export default ArtistOnboarding;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    startOnboarding, 
    completeCurrentStep, 
    skipStep, 
    selectCurrentStep, 
    selectOnboardingSteps, 
    selectOnboardingLoading,
    selectOnboardingError 
} from '../../store/slices/onboarding/userOnboardingSlice';

const UserOnboarding: React.FC = () => {
    const dispatch = useDispatch();

    const currentStepId = useSelector(selectCurrentStep);
    const steps = useSelector(selectOnboardingSteps);
    const loading = useSelector(selectOnboardingLoading);
    const error = useSelector(selectOnboardingError);

    const currentStep = steps.find(step => step.id === currentStepId);

    const handleStart = () => {
        dispatch(startOnboarding());
    };

    const handleCompleteStep = () => {
        dispatch(completeCurrentStep());
    };

    const handleSkipStep = () => {
        dispatch(skipStep());
    };

    return (
        <div className="user-onboarding">
            {!currentStep ? (
                <>
                    <div>Welcome to the platform! Click below to start your onboarding journey.</div>
                    <button onClick={handleStart}>Start Onboarding</button>
                </>
            ) : (
                <>
                    <h2>{currentStep.title}</h2>
                    {/* Here you can render step-specific components or information */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <button onClick={handleCompleteStep}>Complete Step</button>
                            <button onClick={handleSkipStep}>Skip Step</button>
                        </>
                    )}
                </>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );    
};

export default UserOnboarding;

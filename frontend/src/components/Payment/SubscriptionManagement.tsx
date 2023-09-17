import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startSubscription,
    subscriptionSuccess,
    subscriptionFailure,
    endSubscription,
    selectSubscriptionDetails,
    selectSubscriptionStatus,
    selectSubscriptionError,
    SubscriptionDetails
} from '../../store/slices/payment/subscriptionManagementSlice';

const mockSubscriptionAPI = async () => {
    await new Promise(res => setTimeout(res, 2000)); // Simulating API delay
    const mockSuccess = Math.random() > 0.2; // 80% success rate

    if (mockSuccess) {
        return {
            planId: 'premiumPlan',
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            isActive: true,
        };
    } else {
        throw new Error('Failed to process subscription.');
    }
};

const SubscriptionManagement: React.FC = () => {
    const dispatch = useDispatch();
    const subscription = useSelector(selectSubscriptionDetails);
    const status = useSelector(selectSubscriptionStatus);
    const error = useSelector(selectSubscriptionError);

    const handleStartSubscription = async () => {
        dispatch(startSubscription({} as SubscriptionDetails));

        try {
            const subscriptionDetails = await mockSubscriptionAPI();
            dispatch(subscriptionSuccess(subscriptionDetails));
        } catch (err) {
            dispatch(subscriptionFailure('Failed to start subscription.'));
        }
    };

    const handleEndSubscription = () => {
        dispatch(endSubscription());
    };

    return (
        <div>
            <h2>Subscription Management</h2>

            {status === 'loading' && <p>Processing subscription...</p>}
            {error && <p>Error: {error}</p>}

            {subscription ? (
                <div>
                    <h3>Current Subscription</h3>
                    <p>Plan ID: {subscription.planId}</p>
                    <p>Start Date: {new Date(subscription.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(subscription.endDate).toLocaleDateString()}</p>
                    <p>Status: {subscription.isActive ? 'Active' : 'Inactive'}</p>
                    <button onClick={handleEndSubscription}>End Subscription</button>
                </div>
            ) : (
                <div>
                    <h3>No active subscription</h3>
                    <button onClick={handleStartSubscription}>Start Subscription</button>
                </div>
            )}
        </div>
    );
};

export default SubscriptionManagement;

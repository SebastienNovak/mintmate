import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendResetLinkStart,
    resetForgotPasswordState,
    selectIsResetLinkSent,
    selectLoading,
    selectError
} from '../../../store/slices/authenticationAndAuthorization/forgotPasswordSlice';

const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch();

    const isResetLinkSent = useSelector(selectIsResetLinkSent);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [email, setEmail] = useState('');

    const handleSendResetLink = () => {
        dispatch(sendResetLinkStart());
        // TODO: Replace with actual API call to send the reset link to the provided email
    };

    const handleResetForgotPassword = () => {
        dispatch(resetForgotPasswordState());
        setEmail(''); // Also reset the email input field
    };

    return (
        <div>
            <h1>Forgot Password</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isResetLinkSent ? (
                <div>
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendResetLink}>Send Reset Link</button>
                </div>
            ) : (
                <div>
                    <p>We've sent a reset link to your email.</p>
                    <button onClick={handleResetForgotPassword}>Reset</button>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;

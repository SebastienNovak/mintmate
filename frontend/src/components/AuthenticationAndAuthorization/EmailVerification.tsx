import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendVerificationCodeStart,
    verifyCodeStart,
    resetEmailVerification,
    selectIsVerificationCodeSent,
    selectIsVerificationCodeValid,
    selectLoading,
    selectError
} from '../../store/slices/authenticationAndAuthorization/emailVerificationSlice';

const EmailVerification: React.FC = () => {
    const dispatch = useDispatch();
    
    const isVerificationCodeSent = useSelector(selectIsVerificationCodeSent);
    const isVerificationCodeValid = useSelector(selectIsVerificationCodeValid);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [verificationCode, setVerificationCode] = useState('');

    const handleSendVerificationCode = () => {
        dispatch(sendVerificationCodeStart());
        // TODO: Replace with actual API call to send the code
    };

    const handleVerifyCode = () => {
        dispatch(verifyCodeStart());
        // TODO: Replace with actual API call to verify the code
    };

    const handleResetVerification = () => {
        dispatch(resetEmailVerification());
        setVerificationCode(''); // reset the local state as well
    };

    return (
        <div>
            <h1>Email Verification</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isVerificationCodeSent ? (
                <button onClick={handleSendVerificationCode}>Send Verification Code</button>
            ) : (
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Verification Code" 
                        value={verificationCode} 
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button onClick={handleVerifyCode}>Verify Code</button>
                </div>
            )}

            {isVerificationCodeValid === true && <p>Verification Successful!</p>}
            {isVerificationCodeValid === false && (
                <>
                    <p>Verification Failed. Try again.</p>
                    <button onClick={handleResetVerification}>Reset Verification</button>
                </>
            )}
        </div>
    );
};

export default EmailVerification;

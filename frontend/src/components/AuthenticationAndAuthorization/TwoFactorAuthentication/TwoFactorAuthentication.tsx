import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    enable2FAStart,
    verify2FAStart,
    disable2FAStart,
    reset2FAState,
    selectIs2FAEnabled,
    selectLoading2FA,
    selectError2FA,
    selectQRCodeURL,
    selectVerificationPassed
} from '../../../store/slices/authenticationAndAuthorization/twoFactorAuthenticationSlice';

const TwoFactorAuthentication: React.FC = () => {
    const dispatch = useDispatch();
    
    const isEnabled = useSelector(selectIs2FAEnabled);
    const loading = useSelector(selectLoading2FA);
    const error = useSelector(selectError2FA);
    const qrCodeURL = useSelector(selectQRCodeURL);
    const verificationPassed = useSelector(selectVerificationPassed);
    
    const [code, setCode] = useState('');

    const handleEnable2FA = () => {
        dispatch(enable2FAStart());
        // TODO: Connect to API to enable 2FA and fetch QR code URL
    };

    const handleVerify2FA = () => {
        dispatch(verify2FAStart());
        // TODO: Connect to API to verify 2FA code
    };

    const handleDisable2FA = () => {
        dispatch(disable2FAStart());
        // TODO: Connect to API to disable 2FA
    };

    const handleReset2FAState = () => {
        dispatch(reset2FAState());
    };

    return (
        <div>
            <h1>Two Factor Authentication</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            {isEnabled === null && <button onClick={handleEnable2FA}>Enable 2FA</button>}
            
            {isEnabled && !verificationPassed && qrCodeURL && (
                <div>
                    <img src={qrCodeURL} alt="Scan to set up 2FA" />
                    <input 
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={handleVerify2FA}>Verify Code</button>
                </div>
            )}

            {isEnabled && verificationPassed && (
                <div>
                    <p>2FA is enabled and verified!</p>
                    <button onClick={handleDisable2FA}>Disable 2FA</button>
                </div>
            )}
            <button onClick={handleReset2FAState}>Reset 2FA State</button>
        </div>
    );
};

export default TwoFactorAuthentication;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    validateTokenStart,
    resetPasswordStart,
    resetResetPasswordState,
    selectIsResetSuccessful,
    selectLoading,
    selectError,
    selectTokenValidated
} from '../../store/slices/authenticationAndAuthorization/resetPasswordSlice';

const ResetPassword: React.FC = () => {
    const dispatch = useDispatch();

    const isResetSuccessful = useSelector(selectIsResetSuccessful);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const tokenValidated = useSelector(selectTokenValidated);

    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // TODO: Replace with the actual token you want to validate
        //const tokenToValidate = 'exampleToken';
        dispatch(validateTokenStart());

        // TODO: Connect to the API to validate the token using tokenToValidate
        // For now, it's just a placeholder, so ensure you connect this with your backend
        // For instance:
        // api.validateToken(tokenToValidate).then(response => {...}).catch(error => {...});
    }, [dispatch]);

    const handleResetPassword = () => {
        dispatch(resetPasswordStart());
        // TODO: Replace with actual API call to reset the password
    };

    const handleResetState = () => {
        dispatch(resetResetPasswordState());
    };

    return (
        <div>
            <h1>Reset Password</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {tokenValidated === null && <p>Validating token...</p>}

            {tokenValidated === false && <p>Invalid or expired reset token.</p>}

            {tokenValidated && !isResetSuccessful ? (
                <div>
                    <input 
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            ) : (
                isResetSuccessful && <p>Password reset successful!</p>
            )}

            {/* For demonstration purposes, allows resetting the state */}
            <button onClick={handleResetState}>Reset Component State</button>
        </div>
    );
};

export default ResetPassword;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    registerStart,
    resetRegisterState,
    selectIsRegistered,
    selectLoading,
    selectError,
    selectUserInfo
} from '../../store/slices/authenticationAndAuthorization/registerSlice';

const Register: React.FC = () => {
    const dispatch = useDispatch();

    const isRegistered = useSelector(selectIsRegistered);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const userInfo = useSelector(selectUserInfo);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        dispatch(registerStart());
        // TODO: Replace with actual API call to register the user
    };

    const handleResetRegisterState = () => {
        dispatch(resetRegisterState());
    };

    return (
        <div>
            <h1>Register</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isRegistered ? (
                <div>
                    <input 
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            ) : (
                <div>
                    <p>Thank you for registering, {userInfo?.username}!</p>
                    <p>Email: {userInfo?.email}</p>
                    {/* Reset button (might not be necessary in real-world scenarios) */}
                    <button onClick={handleResetRegisterState}>Reset</button>
                </div>
            )}
        </div>
    );
};

export default Register;

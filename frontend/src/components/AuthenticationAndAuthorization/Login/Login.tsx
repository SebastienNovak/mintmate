import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loginStart,
    logout,
    resetLoginState,
    selectIsAuthenticated,
    selectLoading,
    selectError,
    selectUser
} from '../../../store/slices/authenticationAndAuthorization/loginSlice';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const user = useSelector(selectUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(loginStart());
        // TODO: Replace with actual API call to authenticate the user
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleResetLoginState = () => {
        dispatch(resetLoginState());
    };

    return (
        <div>
            <h1>Login</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isAuthenticated ? (
                <div>
                    <input 
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <p>Welcome, {user?.username}!</p>
                    <p>Email: {user?.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                    {/* Reset button (might not be necessary in real-world scenarios) */}
                    <button onClick={handleResetLoginState}>Reset</button>
                </div>
            )}
        </div>
    );
};

export default Login;

import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectLoadingMessage } from '../../../store/slices/other/loadingSpinnerSlice';

const LoadingSpinner: React.FC = () => {
    const isLoading = useSelector(selectIsLoading);
    const message = useSelector(selectLoadingMessage);

    // If not loading, don't render anything
    if (!isLoading) return null;

    return (
        <div className="loading-container">
            <div className="spinner"></div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoadingSpinner;


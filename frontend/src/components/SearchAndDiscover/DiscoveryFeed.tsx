import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDiscoveryContent, // Uncomment once you've defined this thunk function.
    selectContent,
    selectIsLoading,
    selectError
} from '../../store/slices/searchAndDiscover/discoveryFeedSlice';
import { AppDispatch } from '../../store/store';

const DiscoveryFeed: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const content = useSelector(selectContent);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchDiscoveryContent()); // Calls the thunk function to fetch content.
    }, [dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="discovery-feed">
            <h2>Discovery Feed</h2>
            {content.map(item => (
                <div key={item.id} className="content-item">
                    <img src={item.imageUrl} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>{item.type} - {item.date}</span>
                </div>
            ))}
        </div>
    );
};

export default DiscoveryFeed;

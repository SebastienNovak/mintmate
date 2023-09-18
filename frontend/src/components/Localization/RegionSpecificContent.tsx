import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setRegion,
    fetchContentForRegion,
    setContentForRegion,
    setError,
    selectCurrentRegion,
    selectRegionSpecificContent,
    selectLoadingStatus,
    selectError,
    Region,
    Content
} from '../../store/slices/localization/regionSpecificContentSlice'; // Update path accordingly

const mockData: Record<Region, Content> = {
    'US': {
        title: 'Welcome to the US',
        description: 'Discover our unique content tailored for the US audience.',
        imageUrl: 'path_to_us_image.jpg'
    },
    'EU': {
        title: 'Welcome to the EU',
        description: 'Content for EU audience.',
        imageUrl: 'path_to_eu_image.jpg'
    },
    'ASIA': {
        title: 'Welcome to ASIA',
        description: 'Content for ASIA audience.',
        imageUrl: 'path_to_asia_image.jpg'
    },
    'AFRICA': {
        title: 'Welcome to AFRICA',
        description: 'Content for AFRICA audience.',
        imageUrl: 'path_to_africa_image.jpg'
    }
};

const RegionSpecificContent: React.FC = () => {
    const dispatch = useDispatch();

    const currentRegion = useSelector(selectCurrentRegion);
    const content = useSelector(selectRegionSpecificContent);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setRegion(e.target.value as Region));
    };

    useEffect(() => {
        // Simulate fetching content
        dispatch(fetchContentForRegion());
        setTimeout(() => {
            const fetchedContent = mockData[currentRegion];
            if (fetchedContent) {
                dispatch(setContentForRegion(fetchedContent));
            } else {
                dispatch(setError('Failed to fetch content for the selected region'));
            }
        }, 1000);  // Simulate a 1-second delay
    }, [currentRegion, dispatch]);

    return (
        <div>
            <label htmlFor="region-selector">Choose region:</label>
            <select 
                id="region-selector" 
                value={currentRegion} 
                onChange={handleChange}
            >
                <option value="US">US</option>
                <option value="EU">EU</option>
                <option value="ASIA">ASIA</option>
                <option value="AFRICA">AFRICA</option>
            </select>
            {loadingStatus === 'loading' && <p>Loading content...</p>}
            {error && <p>Error: {error}</p>}
            {content && (
                <div>
                    <h3>{content.title}</h3>
                    <p>{content.description}</p>
                    {content.imageUrl && <img src={content.imageUrl} alt={content.title} />}
                </div>
            )}
        </div>
    );
};

export default RegionSpecificContent;

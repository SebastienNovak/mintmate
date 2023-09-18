import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTutorials,
    setTutorials,
    selectTutorial,
    setSearchTerm,
    selectSelectedTutorial,
    selectSearchTerm,
    selectFilteredTutorials,
    selectLoadingStatus,
    selectError,
    Tutorial
} from '../../store/slices/learningAndResources/tutorialCenterSlice'; // Update path accordingly

const mockTutorials: Tutorial[] = [
    {
        id: '1',
        title: 'Sample Video Tutorial',
        description: 'A sample tutorial on a programming topic.',
        type: 'video',
        contentUrl: 'http://sample-tutorial-video.com',
        author: 'Jane Doe',
        duration: '10:30',
        tags: ['programming', 'sample']
    },
    // ... Add more mock tutorials as desired
];

const TutorialCenter: React.FC = () => {
    const dispatch = useDispatch();

    const tutorials = useSelector(selectFilteredTutorials);
    const selectedTutorial = useSelector(selectSelectedTutorial);
    const searchTerm = useSelector(selectSearchTerm);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchTutorials());
        setTimeout(() => {
            dispatch(setTutorials(mockTutorials));
        }, 1000); // Simulated network delay
    }, [dispatch]);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search tutorials..." 
                value={searchTerm} 
                onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
            {loadingStatus === 'loading' && <p>Loading tutorials...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {tutorials.map(tutorial => (
                    <li key={tutorial.id} onClick={() => dispatch(selectTutorial(tutorial.id))}>
                        {tutorial.title}
                    </li>
                ))}
            </ul>
            {selectedTutorial && (
                <div>
                    <h3>{selectedTutorial.title}</h3>
                    <p>Type: {selectedTutorial.type}</p>
                    <p>Description: {selectedTutorial.description}</p>
                    <p>Author: {selectedTutorial.author}</p>
                    {selectedTutorial.duration && <p>Duration: {selectedTutorial.duration}</p>}
                    {selectedTutorial.thumbnailUrl && <img src={selectedTutorial.thumbnailUrl} alt={selectedTutorial.title} />}
                    <a href={selectedTutorial.contentUrl} target="_blank" rel="noopener noreferrer">View Tutorial</a>
                </div>
            )}
        </div>
    );
};

export default TutorialCenter;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchResources,
    setResources,
    selectResource,
    setSearchTerm,
    selectSelectedResource,
    selectSearchTerm,
    selectFilteredResources,
    selectLoadingStatus,
    selectError,
    Resource
} from '../../../store/slices/learningAndResources/resourceLibrarySlice'; // Update path accordingly

const mockResources: Resource[] = [
    {
        id: '1',
        title: 'Sample Article',
        description: 'A sample article on a topic.',
        type: 'article',
        url: 'http://sample-article.com'
    },
    // ... Add more mock resources as desired
];

const ResourceLibrary: React.FC = () => {
    const dispatch = useDispatch();

    const resources = useSelector(selectFilteredResources);
    const selectedResource = useSelector(selectSelectedResource);
    const searchTerm = useSelector(selectSearchTerm);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchResources());
        setTimeout(() => {
            dispatch(setResources(mockResources));
        }, 1000); // Simulated network delay
    }, [dispatch]);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchTerm} 
                onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
            {loadingStatus === 'loading' && <p>Loading resources...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {resources.map(resource => (
                    <li key={resource.id} onClick={() => dispatch(selectResource(resource.id))}>
                        {resource.title}
                    </li>
                ))}
            </ul>
            {selectedResource && (
                <div>
                    <h3>{selectedResource.title}</h3>
                    <p>Type: {selectedResource.type}</p>
                    <p>{selectedResource.description}</p>
                    <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                </div>
            )}
        </div>
    );
};

export default ResourceLibrary;

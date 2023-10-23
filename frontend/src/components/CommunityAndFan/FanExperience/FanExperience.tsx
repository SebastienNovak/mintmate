import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchExperiencesStart,
    fetchExperiencesSuccess,
    fetchExperiencesFailure,
    selectExperiences,
    selectLoading,
    selectError,
    Experience
} from '../../../store/slices/communityAndFan/fanExperienceSlice'; // Adjust the path accordingly

const FanExperience: React.FC = () => {
    const dispatch = useDispatch();
    const experiences = useSelector(selectExperiences);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Mock function for fetching experiences; replace with actual API call.
    const fetchAllExperiences = async (): Promise<Experience[]> => {
        const mockExperiences: Experience[] = [
            {
                id: '1',
                title: 'Meet the Star',
                description: 'A chance to meet your favorite celebrity!',
                date: '2023-05-01T12:00:00Z',
                availability: 'available',
                type: 'meet-and-greet',
                accessLevel: 'elite'
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockExperiences);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchExperiencesStart());

        fetchAllExperiences()
            .then(data => dispatch(fetchExperiencesSuccess(data)))
            .catch(err => dispatch(fetchExperiencesFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Fan Experiences</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {experiences.map(experience => (
                    <li key={experience.id}>
                        <h3>{experience.title}</h3>
                        <p>{experience.description}</p>
                        <p>Date: {new Date(experience.date).toLocaleDateString()}</p>
                        <p>Status: {experience.availability}</p>
                        <p>Type: {experience.type}</p>
                        <p>Access Level: {experience.accessLevel}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FanExperience;

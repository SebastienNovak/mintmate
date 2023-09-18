import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setChallenges,
    setActiveChallenge,
    completeChallenge,
    resetChallenge,
    selectAllChallenges,
    selectActiveChallenge,
    selectCompletedChallenges,
    Challenge as ChallengeType
} from '../../store/slices/interactivity/challengesSlice'; // Update path accordingly

const mockChallenges: ChallengeType[] = [
    {
        id: '1',
        title: 'Challenge 1',
        description: 'Complete the first task',
        reward: '100 points',
        isCompleted: false
    },
    {
        id: '2',
        title: 'Challenge 2',
        description: 'Complete the second task',
        reward: '200 points',
        isCompleted: false,
        expiryDate: new Date('2023-09-01')
    },
    // ... Add more mock challenges as desired
];

const Challenges: React.FC = () => {
    const dispatch = useDispatch();
    const challenges = useSelector(selectAllChallenges);
    const activeChallenge = useSelector(selectActiveChallenge);
    const completedChallenges = useSelector(selectCompletedChallenges);

    useEffect(() => {
        dispatch(setChallenges(mockChallenges));
    }, [dispatch]);

    return (
        <div>
            <h2>All Challenges</h2>
            {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-item">
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <p>Reward: {challenge.reward}</p>
                    {challenge.expiryDate && <p>Expires on: {challenge.expiryDate.toLocaleDateString()}</p>}
                    <button onClick={() => dispatch(setActiveChallenge(challenge.id))}>View</button>
                </div>
            ))}

            {activeChallenge && (
                <div className="active-challenge">
                    <h2>Active Challenge</h2>
                    <h3>{activeChallenge.title}</h3>
                    <p>{activeChallenge.description}</p>
                    <p>Reward: {activeChallenge.reward}</p>
                    {activeChallenge.isCompleted ? (
                        <>
                            <p>Completed!</p>
                            <button onClick={() => dispatch(resetChallenge(activeChallenge.id))}>Reset</button>
                        </>
                    ) : (
                        <button onClick={() => dispatch(completeChallenge(activeChallenge.id))}>Complete</button>
                    )}
                </div>
            )}

            <h2>Completed Challenges</h2>
            {completedChallenges.map(challenge => (
                <div key={challenge.id} className="completed-challenge">
                    <h3>{challenge.title}</h3>
                    <p>Reward received: {challenge.reward}</p>
                </div>
            ))}
        </div>
    );
};

export default Challenges;

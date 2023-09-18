import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectOptions,
    selectUserVote,
    selectLoadingStatus,
    selectError,
    voteForOption
} from '../../store/slices/interactivity/votingSlice'; // Update path accordingly

const Voting: React.FC = () => {
    const dispatch = useDispatch();
    const options = useSelector(selectOptions);
    const userVote = useSelector(selectUserVote);
    const loading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleVoteClick = useCallback((optionId: string) => {
        if (!userVote) {
            dispatch(voteForOption(optionId));
        }
    }, [dispatch, userVote]);

    return (
        <div className="voting">
            <h2>Voting Poll</h2>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
            <ul className="voting-options">
                {options.map(option => (
                    <li key={option.id} className="voting-option">
                        <button 
                            onClick={() => handleVoteClick(option.id)} 
                            disabled={!!userVote}
                        >
                            {option.text}
                        </button>
                        <span className="vote-count">{option.voteCount} votes</span>
                        {userVote === option.id && <span className="voted-indicator">(You voted here)</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Voting;

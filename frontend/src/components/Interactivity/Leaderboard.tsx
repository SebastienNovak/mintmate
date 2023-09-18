import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectLeaderboard,
    selectLoadingStatus,
    selectError,
} from '../../store/slices/interactivity/leaderboardSlice'; // Update path accordingly

const Leaderboard: React.FC = () => {
    const leaderboard = useSelector(selectLeaderboard);
    const loading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}

            <ul className="leaderboard-list">
                {leaderboard.map(userScore => (
                    <li key={userScore.userId} className="leaderboard-item">
                        <div className="rank">#{userScore.rank}</div>
                        {userScore.avatarUrl && <img src={userScore.avatarUrl} alt={userScore.username} className="avatar" />}
                        <div className="username">{userScore.username}</div>
                        <div className="score">{userScore.score} points</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;

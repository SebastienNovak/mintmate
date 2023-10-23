import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchPlaylists, 
    setPlaylists, 
    setError,
    selectPlaylists, 
    selectLoadingStatus, 
    selectError, 
    Playlist
} from '../../../store/slices/music/moodBasedPlaylistsSlice';  // Please replace with the actual path

const MoodBasedPlaylists: React.FC = () => {
    const dispatch = useDispatch();

    const playlists = useSelector(selectPlaylists);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const fetchMoodBasedPlaylists = useCallback(async () => {
        try {
            dispatch(fetchPlaylists());

            // Mock API call
            const response: Playlist[] = [
                {
                    mood: "Happy",
                    songs: [{ id: 1, title: "Happy Song", artist: "Happy Artist", duration: "03:45" }, 
                            // ... other songs
                            ]
                },
                // ... other mock playlists
            ];
            
            dispatch(setPlaylists(response));
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMoodBasedPlaylists();
    }, [fetchMoodBasedPlaylists]);

    if (loadingStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mood-playlists">
            {playlists.map(playlist => (
                <div key={playlist.mood} className="playlist">
                    <h2>{playlist.mood}</h2>
                    <ul>
                        {playlist.songs.map(song => (
                            <li key={song.id}>
                                {song.title} by {song.artist} - {song.duration}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MoodBasedPlaylists;

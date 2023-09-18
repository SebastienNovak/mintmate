import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchUserPlaylists, 
    setUserPlaylists, 
    setCurrentPlaylist, 
    clearCurrentPlaylist, 
    setError,
    selectCurrentPlaylist, 
    selectUserPlaylists, 
    selectLoadingStatus, 
    selectError ,
    Playlist
} from '../../store/slices/music/playlistSlice';  // Replace with your actual path

type PlaylistProps = {
    playlistId?: number;
};

const Playlist: React.FC<PlaylistProps> = ({ playlistId }) => {
    const dispatch = useDispatch();

    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const userPlaylists = useSelector(selectUserPlaylists);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const fetchPlaylistsData = useCallback(async () => {
        try {
            dispatch(fetchUserPlaylists());

            // Mock API call
            const response: Playlist[] = [
                // ... mock playlists data here
            ];
            
            dispatch(setUserPlaylists(response));

            if (playlistId) {
                const specificPlaylist = response.find(playlist => playlist.id === playlistId);
                if (specificPlaylist) {
                    dispatch(setCurrentPlaylist(specificPlaylist));
                } else {
                    throw new Error("Playlist not found");
                }
            } else {
                dispatch(clearCurrentPlaylist());
            }
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch, playlistId]);

    useEffect(() => {
        fetchPlaylistsData();
    }, [fetchPlaylistsData]);

    if (loadingStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (currentPlaylist) {
        return (
            <div className="current-playlist">
                <h2>{currentPlaylist.name}</h2>
                <p>{currentPlaylist.description}</p>
                <ul>
                    {currentPlaylist.songs.map(song => (
                        <li key={song.id}>
                            {song.title} by {song.artist} - {song.duration}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="user-playlists">
            {userPlaylists.map(playlist => (
                <div key={playlist.id} className="playlist">
                    <h2>{playlist.name}</h2>
                    <p>{playlist.description}</p>
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

export default Playlist;

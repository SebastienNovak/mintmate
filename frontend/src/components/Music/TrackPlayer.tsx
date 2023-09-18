import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    //loadTrack,
    play,
    pause,
    skipToNext,
    skipToPrevious,
    updateCurrentTime,
    setVolume,
    setRepeatMode,
    toggleShuffle,
    setError,
    selectCurrentTrack,
    selectIsPlaying,
    selectCurrentTime,
    selectVolume,
    selectRepeatMode,
    selectShuffle,
    selectLoadingStatus,
    selectError
} from '../../store/slices/music/trackPlayerSlice';  // Replace with your actual path

const TrackPlayer: React.FC = () => {
    const dispatch = useDispatch();

    const currentTrack = useSelector(selectCurrentTrack);
    const isPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(selectCurrentTime);
    const volume = useSelector(selectVolume);
    const repeatMode = useSelector(selectRepeatMode);
    const shuffle = useSelector(selectShuffle);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    // Placeholder function to load initial track or handle any other initialization logic
    const initializePlayer = useCallback(() => {
        // Sample dispatch, modify based on your requirement:
        //dispatch(loadTrack(sampleTrack));
    
        // Simulating potential error during track initialization
        const isError = Math.random() > 0.7;  // 30% chance of error for demo purposes
        if (isError) {
            dispatch(setError("Failed to load the track."));
        }
    }, [dispatch]);

    useEffect(() => {
        initializePlayer();
    }, [initializePlayer]);

    if (loadingStatus === 'loading') {
        return <p>Loading track...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="track-player">
            <input
                type="range"
                min={0}
                max={currentTrack?.duration || 0} 
                value={currentTime}
                onChange={(e) => dispatch(updateCurrentTime(Number(e.target.value)))}
            />
            {currentTrack && (
                <>
                    <h3>{currentTrack.title} by {currentTrack.artist}</h3>
                    <img src={currentTrack.coverImageUrl} alt={currentTrack.title} />

                    <div className="controls">
                        <button onClick={() => dispatch(skipToPrevious())}>Previous</button>
                        {isPlaying 
                            ? <button onClick={() => dispatch(pause())}>Pause</button> 
                            : <button onClick={() => dispatch(play())}>Play</button>}
                        <button onClick={() => dispatch(skipToNext())}>Next</button>
                        <button onClick={() => dispatch(toggleShuffle())}>
                            Shuffle: {shuffle ? "On" : "Off"}
                        </button>
                        <div className="repeat-control">
                            <label>Repeat Mode: </label>
                            <select 
                                value={repeatMode} 
                                onChange={(e) => dispatch(setRepeatMode(e.target.value as "playlist" | "off" | "track"))}
                            >
                                <option value="off">Off</option>
                                <option value="playlist">Playlist</option>
                                <option value="track">Track</option>
                            </select>
                        </div>
                    </div>

                    <div className="status">
                        <p>Current Time: {currentTime}</p>
                        <p>Volume: {volume}</p>
                        <p>Repeat Mode: {repeatMode}</p>
                        <p>Shuffle: {shuffle ? "On" : "Off"}</p>
                    </div>

                    {/* Add more UI elements and functionalities as needed */}
                </>
            )}
            <div className="volume-control">
                <label>Volume: </label>
                <input
                    type="range"
                    min={0}
                    max={100} // Assuming your volume range is 0-100
                    value={volume}
                    onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
                />
            </div>
        </div>
    );
};

export default TrackPlayer;

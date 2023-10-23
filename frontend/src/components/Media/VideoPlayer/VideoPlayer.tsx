import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    // loadVideo,
    play,
    pause,
    updateCurrentTime,
    setDuration,
    setVolume,
    setError,
    selectVideoUrl,
    selectIsPlaying,
    selectCurrentTime,
    selectDuration,
    selectVolume,
    selectLoadingStatus,
    selectError
} from '../../../store/slices/media/videoPlayerSlice';  // Update to the actual path

const VideoPlayer: React.FC = () => {
    const dispatch = useDispatch();
    const videoRef = useRef<HTMLVideoElement>(null);

    const videoUrl = useSelector(selectVideoUrl);
    const isPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(selectCurrentTime);
    const duration = useSelector(selectDuration);
    const volume = useSelector(selectVolume);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', () => {
                dispatch(setDuration(videoElement.duration));
            });

            videoElement.addEventListener('timeupdate', () => {
                dispatch(updateCurrentTime(videoElement.currentTime));
            });

            videoElement.addEventListener('ended', () => {
                dispatch(pause());
            });

            videoElement.addEventListener('error', () => {
                dispatch(setError('Error loading video'));
            });

            return () => {
                videoElement.removeEventListener('loadedmetadata', () => {});
                videoElement.removeEventListener('timeupdate', () => {});
                videoElement.removeEventListener('ended', () => {});
                videoElement.removeEventListener('error', () => {});
            };
        }
    }, [dispatch]);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            if (isPlaying) {
                videoElement.play();
            } else {
                videoElement.pause();
            }

            videoElement.volume = volume;
        }
    }, [isPlaying, volume]);

    return (
        <div>
            <h2>Video Player</h2>
            
            {loadingStatus === "loading" && <p>Loading video...</p>}
            {loadingStatus === "failed" && <p>Failed to load the video. Please try again.</p>}
            {error && <p>Error: {error}</p>}
            
            {videoUrl && (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    style={{ width: '100%', maxHeight: '400px' }}
                    controls
                ></video>
            )}
            <div>
                <button onClick={() => dispatch(play())}>Play</button>
                <button onClick={() => dispatch(pause())}>Pause</button>
                <span>Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
                />
                <span>Volume: {Math.round(volume * 100)}%</span>
            </div>
        </div>
    );
};

export default VideoPlayer;

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchSoundPacks, 
    setSoundPacks, 
    setCurrentSoundPack, 
    clearCurrentSoundPack, 
    setError,
    selectCurrentSoundPack, 
    selectSoundPacksList, 
    selectLoadingStatus, 
    selectError, 
    SoundPack
} from '../../../store/slices/music/soundPacksSlice';

const SoundPacks: React.FC = () => {
    const dispatch = useDispatch();

    const currentSoundPack = useSelector(selectCurrentSoundPack);
    const soundPacksList = useSelector(selectSoundPacksList);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const fetchPacks = useCallback(async () => {
        try {
            dispatch(fetchSoundPacks());

            // Mock API call
            const response: SoundPack[] = [
                // ... mock sound pack data here
            ];

            dispatch(setSoundPacks(response));
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPacks();
    }, [fetchPacks]);

    const handleSelectSoundPack = (soundPack: SoundPack) => {
        dispatch(setCurrentSoundPack(soundPack));
    };

    if (loadingStatus === 'loading') {
        return <p>Loading sound packs...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="sound-packs">
            <h2>Sound Packs</h2>
            
            {currentSoundPack ? (
                <div className="sound-pack-details">
                    <h3>{currentSoundPack.title}</h3>
                    <img src={currentSoundPack.coverImageUrl} alt={currentSoundPack.title} />
                    <p>{currentSoundPack.description}</p>
                    <ul>
                        {currentSoundPack.sounds.map(sound => (
                            <li key={sound.id}>
                                {sound.name} - {sound.duration}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => dispatch(clearCurrentSoundPack())}>Go back to list</button>
                </div>
            ) : (
                <ul className="sound-pack-list">
                    {soundPacksList.map(soundPack => (
                        <li key={soundPack.id} onClick={() => handleSelectSoundPack(soundPack)}>
                            {soundPack.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SoundPacks;

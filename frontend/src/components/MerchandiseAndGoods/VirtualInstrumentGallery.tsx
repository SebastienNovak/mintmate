import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadInstruments,
    viewInstrument,
    playSample,
    stopSample,
    selectInstrumentList,
    selectCurrentInstrument,
    selectPlayingSample,
    selectLoadingStatus,
    selectError,
    setError
} from '../../store/slices/merchandiseAndGoods/virtualInstrumentGallerySlice'; // Update this to the actual path of your Redux slice

const VirtualInstrumentGallery: React.FC = () => {
    const dispatch = useDispatch();

    const instrumentList = useSelector(selectInstrumentList);
    const currentInstrument = useSelector(selectCurrentInstrument);
    const playingSample = useSelector(selectPlayingSample);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        async function fetchInstruments() {
            try {
                const response = await fetch('yourInstrumentsEndpoint'); // Replace with your API endpoint
                const instruments = await response.json();
                dispatch(loadInstruments(instruments));
            } catch (err) {
                dispatch(setError('Error fetching instruments'));
            }
        }

        fetchInstruments();
    }, [dispatch]);

    return (
        <div>
            <h2>Virtual Instruments</h2>

            {loadingStatus === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {instrumentList.map(instrument => (
                    <li key={instrument.id}>
                        <button onClick={() => dispatch(viewInstrument(instrument.id))}>
                            {instrument.name}
                        </button>
                    </li>
                ))}
            </ul>

            {currentInstrument && (
                <div>
                    <h3>{currentInstrument.name}</h3>
                    <img src={currentInstrument.imageUrl} alt={currentInstrument.name} width="200" />
                    <p>{currentInstrument.description}</p>
                    <p>Category: {currentInstrument.category}</p>
                    {playingSample === currentInstrument.sampleAudioUrl ? (
                        <button onClick={() => dispatch(stopSample())}>Stop Sample</button>
                    ) : (
                        <button onClick={() => dispatch(playSample(currentInstrument.sampleAudioUrl))}>Play Sample</button>
                    )}
                </div>
            )}

            {playingSample && (
                <audio src={playingSample} autoPlay controls onEnded={() => dispatch(stopSample())} />
            )}
        </div>
    );
};

export default VirtualInstrumentGallery;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchFanArtsStart,
    fetchFanArtsSuccess,
    fetchFanArtsFailure,
    incrementLikes,
    selectFanArts,
    selectFanArtsLoading,
    selectFanArtsError,
    FanArt
} from '../../store/slices/communityAndFan/fanArtGallerySlice'; // Adjust the path accordingly

const FanArtGallery: React.FC = () => {
    const dispatch = useDispatch();
    const fanArts = useSelector(selectFanArts);
    const loading = useSelector(selectFanArtsLoading);
    const error = useSelector(selectFanArtsError);

    // Mock function for fetching fan arts; replace with actual API call.
    const fetchAllFanArts = async (): Promise<FanArt[]> => {
        const mockFanArts: FanArt[] = [
            {
                id: '1',
                title: 'Artwork 1',
                artistName: 'Artist A',
                imageUrl: 'url-to-image1',
                description: 'Description for artwork 1',
                submissionDate: '2023-01-01T12:00:00Z',
                likes: 5
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockFanArts);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchFanArtsStart());

        fetchAllFanArts()
            .then(data => dispatch(fetchFanArtsSuccess(data)))
            .catch(err => dispatch(fetchFanArtsFailure(err.message)));
    }, [dispatch]);

    const handleLike = (id: string) => {
        dispatch(incrementLikes(id));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Fan Art Gallery</h1>
            <ul>
                {fanArts.map(art => (
                    <li key={art.id}>
                        <h3>{art.title}</h3>
                        <p>By: {art.artistName}</p>
                        <img src={art.imageUrl} alt={art.title} />
                        <p>{art.description}</p>
                        <p>Submitted on: {new Date(art.submissionDate).toLocaleDateString()}</p>
                        <button onClick={() => handleLike(art.id)}>Like ({art.likes})</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FanArtGallery;

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAlbum, 
    fetchAlbums, 
    setAlbum, 
    setAlbums,
    selectCurrentAlbum, 
    selectAlbumList, 
    selectLoadingStatus, 
    selectError,
    setError 
} from '../../../store/slices/music/albumSlice';

type Album = {
    id: number;
    title: string;
    artist: string;
    coverImageUrl: string;
    tracks: string[];
};

type AlbumProps = {
    albumId?: number;  // This is just an example, to indicate which album to fetch
};

const Album: React.FC<AlbumProps> = ({ albumId }) => {
    const dispatch = useDispatch();

    const currentAlbum = useSelector(selectCurrentAlbum);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);
    const albumList = useSelector(selectAlbumList);

    // Assume we have an API function called `getAlbumById` and `getAllAlbums`
    // These are just mock functions for the sake of example
    const getAlbumById = useCallback(async (id: number) => {
        try {
            // Mock response
            const response: Album = {
                id: id,  // use the id parameter here
                title: "Album Title",
                artist: "Artist Name",
                coverImageUrl: "url",
                tracks: ["track1", "track2"]
            };
            dispatch(setAlbum(response));
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch]);

    const getAllAlbums = useCallback(async () => {
        try {
            // Mock response
            const response: Album[] = [
                {
                    id: 1,
                    title: "Album Title 1",
                    artist: "Artist Name 1",
                    coverImageUrl: "url1",
                    tracks: ["track1", "track2"]
                },
                // ... other mock albums
            ];
            dispatch(setAlbums(response));
        } catch (e) {
            if (typeof e?.toString === 'function') {
                dispatch(setError(e.toString()));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    }, [dispatch]);
    

    useEffect(() => {
        if(albumId) {
            dispatch(fetchAlbum(albumId));
            getAlbumById(albumId);
        } else {
            dispatch(fetchAlbums());
            getAllAlbums();
        }
    }, [albumId, dispatch, getAlbumById, getAllAlbums]);
    

    if (loadingStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!currentAlbum && albumList.length === 0) {
        return <p>Select an album to view its details.</p>;
    }

    if (!currentAlbum) {
        return (
            <div className="album-list">
                {albumList.map(album => (
                    <div key={album.id} className="album-item">
                        <img src={album.coverImageUrl} alt={album.title} />
                        <h2>{album.title}</h2>
                        <h3>{album.artist}</h3>
                    </div>
                ))}
            </div>
        );
    }
};

export default Album;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Artwork, 
    fetchArtistPortfolio, 
    addArtwork, 
    removeArtwork, 
    updateBio,
    selectArtistPortfolio,
    selectArtworks
} from '../../../store/slices/userAndArtist/artistPortfolioSlice';
import { AppDispatch } from '../../../store/store';

type ArtistPortfolioProps = {
    artistId: string;
};

const ArtistPortfolio: React.FC<ArtistPortfolioProps> = ({ artistId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const artistPortfolio = useSelector(selectArtistPortfolio);
    const artworks = useSelector(selectArtworks);
    const [newBio, setNewBio] = useState(artistPortfolio.bio);
    const [newArtwork, setNewArtwork] = useState<Partial<Artwork>>({
        artworkId: '',
        title: '',
        description: '',
        price: 0,
    });

    useEffect(() => {
        dispatch(fetchArtistPortfolio(artistId));
    }, [artistId, dispatch]);

    const handleUpdateBio = () => {
        dispatch(updateBio(newBio));
    };

    const handleAddArtwork = () => {
        if (newArtwork.title && newArtwork.description) {
            const artwork = {
                artworkId: Date.now().toString(),
                ...newArtwork,
            } as Artwork;  // <-- use type assertion here
    
            dispatch(addArtwork(artwork));
            setNewArtwork({
                artworkId: '',
                title: '',
                description: '',
                price: 0,
            });
        }
    };    

    return (
        <div>
            <h2>{artistPortfolio.name}'s Portfolio</h2>
            <p>Bio: {artistPortfolio.bio}</p>
            <textarea
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Update Bio"
            />
            <button onClick={handleUpdateBio}>Update Bio</button>

            <h3>Artworks</h3>
            {artworks.map(art => (
                <div key={art.artworkId}>
                    <p>Title: {art.title}</p>
                    <p>Description: {art.description}</p>
                    <p>Price: ${art.price}</p>
                    <button onClick={() => dispatch(removeArtwork(art.artworkId))}>
                        Remove
                    </button>
                </div>
            ))}

            <div>
                <h3>Add New Artwork</h3>
                <input
                    value={newArtwork.title}
                    onChange={(e) => setNewArtwork(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Title"
                />
                <textarea
                    value={newArtwork.description}
                    onChange={(e) => setNewArtwork(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={newArtwork.price}
                    onChange={(e) => setNewArtwork(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="Price"
                />
                <button onClick={handleAddArtwork}>Add Artwork</button>
            </div>
        </div>
    );
}

export default ArtistPortfolio;

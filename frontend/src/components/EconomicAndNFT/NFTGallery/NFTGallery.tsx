import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchNFTsStart,
    fetchNFTsSuccess,
    fetchNFTsFailure,
    selectNFTs,
    selectGalleryLoading,
    selectGalleryError,
    NFT
} from '../../../store/slices/economicAndNFT/NFTGallerySlice'; // Make sure the path is correct

const NFTGallery: React.FC = () => {
    const dispatch = useDispatch();
    const nfts = useSelector(selectNFTs);
    const loading = useSelector(selectGalleryLoading);
    const error = useSelector(selectGalleryError);

    // Placeholder mock function, replace with actual API call in your application.
    const fetchNFTGallery = async (): Promise<NFT[]> => {
        // Replace with real data fetching logic
        const mockData: NFT[] = [
            // ... some mocked data ...
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchNFTsStart());

        fetchNFTGallery()
            .then(data => dispatch(fetchNFTsSuccess(data)))
            .catch(err => dispatch(fetchNFTsFailure(err.message)));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="nft-gallery">
            {nfts.map(nft => (
                <div key={nft.id} className="nft-item">
                    <img src={nft.imageUrl} alt={nft.title} />
                    <h2>{nft.title}</h2>
                    <div className="nft-owner">
                        <img src={nft.owner.avatarUrl} alt={nft.owner.name} />
                        <p>{nft.owner.name}</p>
                    </div>
                    <p>Price: {nft.price} ETH</p>
                </div>
            ))}
        </div>
    );
};

export default NFTGallery;

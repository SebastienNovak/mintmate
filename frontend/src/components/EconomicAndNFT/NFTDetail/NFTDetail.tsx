import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchNFTDetailStart,
    fetchNFTDetailSuccess,
    fetchNFTDetailFailure,
    selectNFTDetail,
    selectLoading,
    selectError,
    NFTDetail as NFTDetailType
} from '../../../store/slices/economicAndNFT/NFTDetailSlice'; // Ensure correct path

const NFTDetail: React.FC = () => {
    const dispatch = useDispatch();
    const nftDetail = useSelector(selectNFTDetail);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // For the sake of this example, I'm using a mock function.
    // Replace this with an actual API call in your application.
    const fetchNFTData = async (): Promise<NFTDetailType> => {
        // Replace with actual data fetching logic
        const mockData: NFTDetailType = {
            id: "sampleId",
            title: "Sample NFT Title",
            imageUrl: "path-to-image.jpg",
            description: "This is a sample NFT description.",
            owner: {
                id: "sampleOwnerId",
                name: "John Doe",
                avatarUrl: "path-to-avatar.jpg"
            },
            price: 2.5,
            history: [
                { date: "2023-01-01", event: "Minted by John Doe" },
                { date: "2023-02-01", event: "Sold to Jane Smith" }
            ]
        };
        

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchNFTDetailStart());

        fetchNFTData()
            .then(data => dispatch(fetchNFTDetailSuccess(data)))
            .catch(err => dispatch(fetchNFTDetailFailure(err.message)));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {nftDetail && (
                <div>
                    <h1>{nftDetail.title}</h1>
                    <img src={nftDetail.imageUrl} alt={nftDetail.title} />
                    <p>{nftDetail.description}</p>
                    <div>
                        <h3>Owner</h3>
                        <img src={nftDetail.owner.avatarUrl} alt={nftDetail.owner.name} />
                        <p>{nftDetail.owner.name}</p>
                    </div>
                    <p>Price: {nftDetail.price} ETH</p>
                    <div>
                        <h3>Transaction History</h3>
                        <ul>
                            {nftDetail.history.map((transaction, index) => (
                                <li key={index}>
                                    {transaction.date}: {transaction.event}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NFTDetail;

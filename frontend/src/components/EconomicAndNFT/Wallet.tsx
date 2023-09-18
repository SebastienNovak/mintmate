import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAssetsStart,
    fetchAssetsSuccess,
    fetchAssetsFailure,
    selectAssets,
    selectTotalBalance,
    selectWalletLoading,
    selectWalletError,
    Asset
} from '../../store/slices/economicAndNFT/walletSlice'; // Adjust the path accordingly

const Wallet: React.FC = () => {
    const dispatch = useDispatch();
    const assets = useSelector(selectAssets);
    const totalBalance = useSelector(selectTotalBalance);
    const loading = useSelector(selectWalletLoading);
    const error = useSelector(selectWalletError);

    // Mock function for fetching assets; replace with actual API call.
    const fetchWalletAssets = async (): Promise<Asset[]> => {
        const mockAssets: Asset[] = [
            {
                id: '1',
                type: 'cryptocurrency',
                name: 'Ethereum',
                balance: 3.2
            },
            {
                id: '2',
                type: 'nft',
                name: 'Digital Artwork',
                balance: 1,
                imageUrl: 'url-to-image'
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockAssets);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchAssetsStart());

        fetchWalletAssets()
            .then(data => dispatch(fetchAssetsSuccess(data)))
            .catch(err => dispatch(fetchAssetsFailure(err.message)));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>My Wallet</h1>
            <p>Total Balance: {totalBalance} ETH</p>
            <ul>
                {assets.map(asset => (
                    <li key={asset.id}>
                        <h3>{asset.name}</h3>
                        <p>Type: {asset.type}</p>
                        <p>Balance: {asset.balance}</p>
                        {asset.type === 'nft' && asset.imageUrl && (
                            <img src={asset.imageUrl} alt={asset.name} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wallet;

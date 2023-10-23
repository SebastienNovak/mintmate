import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMerchandise,
    buyMerchandise,
    restockMerchandise,
    setError,
    selectMerchandiseList,
    selectSoldItems,
    selectLoadingStatus,
    selectError
} from '../../../store/slices/merchandiseAndGoods/merchandiseListSlice';  // Update this to the actual path of your Redux slice

const MerchandiseList: React.FC = () => {
    const dispatch = useDispatch();

    // State for form inputs
    const [merchandiseName, setMerchandiseName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [stock, setStock] = useState<number | string>('');
    const [imageUrl, setImageUrl] = useState('');

    // Selectors
    const merchandiseList = useSelector(selectMerchandiseList);
    const soldItems = useSelector(selectSoldItems);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleAddMerchandise = () => {
        const newMerchandise = {
            id: Date.now(),
            name: merchandiseName,
            description,
            price: Number(price),
            stock: Number(stock),
            imageUrl
        };
        dispatch(addMerchandise(newMerchandise));
        setMerchandiseName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImageUrl('');
    };

    const handleBuyMerchandise = (merchandiseId: number) => {
        const buyer = prompt("Enter your username to purchase this item:");
        if (buyer) {
            const selectedMerchandise = merchandiseList.find(m => m.id === merchandiseId);
            if (!selectedMerchandise) {
                dispatch(setError(`Merchandise with ID ${merchandiseId} not found.`));
                return;
            }
            if (selectedMerchandise.stock <= 0) {
                dispatch(setError("This merchandise is out of stock."));
                return;
            }
            dispatch(buyMerchandise({ merchandiseId, buyer }));
        }
    };

    const handleRestockMerchandise = (merchandiseId: number) => {
        const quantityStr = prompt("Enter the quantity to restock:");
        if (quantityStr) {
            const quantity = parseInt(quantityStr, 10);
            if (!isNaN(quantity)) {
                dispatch(restockMerchandise({ merchandiseId, quantity }));
            }
        }
    };

    return (
        <div>
            <h2>Merchandise</h2>

            {loadingStatus === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <h3>Add New Merchandise</h3>
            <input value={merchandiseName} onChange={(e) => setMerchandiseName(e.target.value)} placeholder="Name" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" />
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
            <button onClick={handleAddMerchandise}>Add Merchandise</button>

            <h3>Available Merchandise</h3>
            <ul>
                {merchandiseList.map(merch => (
                    <li key={merch.id}>
                        <img src={merch.imageUrl} alt={merch.name} width="100" /> {/* consider using a thumbnail version for better performance */}
                        <p>{merch.name} - ${merch.price} (In stock: {merch.stock})</p>
                        <button onClick={() => handleBuyMerchandise(merch.id)}>Buy</button>
                        <button onClick={() => handleRestockMerchandise(merch.id)}>Restock</button>
                    </li>
                ))}
            </ul>

            <h3>Sold Merchandise</h3>
            <ul>
                {soldItems.map(sold => (
                    <li key={sold.merchandiseId}>
                        {sold.buyer} purchased item {sold.merchandiseId} on {sold.purchaseDate.toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MerchandiseList;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addEquipment,
    rentEquipment,
    returnEquipment,
    setError,
    selectEquipmentList,
    selectRentals,
    selectLoadingStatus,
    selectError
} from '../../../store/slices/merchandiseAndGoods/equipmentRentalsSlice';  // Update this to the actual path of your Redux slice

const EquipmentRentals: React.FC = () => {
    const dispatch = useDispatch();

    // State for form inputs
    const [equipmentName, setEquipmentName] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerDay, setPricePerDay] = useState<number | string>('');

    // Selectors
    const equipmentList = useSelector(selectEquipmentList);
    const rentals = useSelector(selectRentals);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleAddEquipment = () => {
        const newEquipment = {
            id: Date.now(), // This is a simplistic way to get a unique ID, consider using a more robust method
            name: equipmentName,
            description,
            pricePerDay: Number(pricePerDay),
            isAvailable: true
        };
        dispatch(addEquipment(newEquipment));
        setEquipmentName('');
        setDescription('');
        setPricePerDay('');
    };

    const handleRentEquipment = (equipmentId: number) => {
        const renter = prompt("Enter your username to rent this equipment:");
        if (renter) {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 7);  // Default rental period of 7 days, can be adjusted
            const rental = {
                rentalId: Date.now(),
                equipmentId,
                renter,
                startDate,
                endDate
            };
            dispatch(rentEquipment(rental));
        }
    };

    const handleReturnEquipment = (rentalId: number) => {
        dispatch(returnEquipment(rentalId));
    };

    const triggerError = () => {
        dispatch(setError('This is a test error.'));
    };

    return (
        <div>
            <h2>Equipment Rentals</h2>

            {loadingStatus === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <h3>Add New Equipment</h3>
            <input value={equipmentName} onChange={(e) => setEquipmentName(e.target.value)} placeholder="Equipment Name" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="Price Per Day" />
            <button onClick={handleAddEquipment}>Add Equipment</button>

            <h3>Available Equipment</h3>
            <ul>
                {equipmentList.map(equipment => equipment.isAvailable && (
                    <li key={equipment.id}>
                        {equipment.name} - ${equipment.pricePerDay}/day
                        <button onClick={() => handleRentEquipment(equipment.id)}>Rent</button>
                    </li>
                ))}
            </ul>

            <h3>Current Rentals</h3>
            <ul>
                {rentals.map(rental => (
                    <li key={rental.rentalId}>
                        {rental.renter} rented equipment {rental.equipmentId}
                        <button onClick={() => handleReturnEquipment(rental.rentalId)}>Return</button>
                    </li>
                ))}
            </ul>

            <button onClick={triggerError}>Trigger Error</button>
        </div>
    );
};

export default EquipmentRentals;

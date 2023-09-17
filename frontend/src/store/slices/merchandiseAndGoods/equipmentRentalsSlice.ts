import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Equipment = {
    id: number;
    name: string;
    description: string;
    pricePerDay: number;  // Daily rental price
    isAvailable: boolean;
};

type EquipmentRental = {
    rentalId: number;
    equipmentId: number;
    renter: string;  // Username of the person who rented the equipment
    startDate: Date;
    endDate: Date;
};

type EquipmentRentalsState = {
    equipmentList: Equipment[];
    rentals: EquipmentRental[];
    loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: EquipmentRentalsState = {
    equipmentList: [],
    rentals: [],
    loadingStatus: 'idle',
    error: null
};

const equipmentRentalsSlice = createSlice({
    name: 'equipmentRentals',
    initialState,
    reducers: {
        addEquipment: (state, action: PayloadAction<Equipment>) => {
            state.equipmentList.push(action.payload);
        },
        rentEquipment: (state, action: PayloadAction<EquipmentRental>) => {
            const equipment = state.equipmentList.find(e => e.id === action.payload.equipmentId);
            if (equipment) {
                equipment.isAvailable = false;
            }
            state.rentals.push(action.payload);
        },
        returnEquipment: (state, action: PayloadAction<number>) => {
            const rental = state.rentals.find(r => r.rentalId === action.payload);
            if (rental) {
                const equipment = state.equipmentList.find(e => e.id === rental.equipmentId);
                if (equipment) {
                    equipment.isAvailable = true;
                }
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loadingStatus = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    addEquipment,
    rentEquipment,
    returnEquipment,
    setError
} = equipmentRentalsSlice.actions;

// Selectors
type RootState = {
    equipmentRentals: EquipmentRentalsState;
};

export const selectEquipmentList = (state: RootState) => state.equipmentRentals.equipmentList;
export const selectRentals = (state: RootState) => state.equipmentRentals.rentals;
export const selectLoadingStatus = (state: RootState) => state.equipmentRentals.loadingStatus;
export const selectError = (state: RootState) => state.equipmentRentals.error;

export default equipmentRentalsSlice.reducer;

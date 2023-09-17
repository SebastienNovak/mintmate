import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
    selectTransactions,
    selectLoadingStatus,
    selectError
} from '../../store/slices/payment/billingHistorySlice';

// TODO: You'll want to replace this with a real API call.
const simulatedAPI = {
    fetchTransactions: async () => {
        return [
            // Sample data; replace with actual data from your API.
            { id: '1', date: '2023-08-10', amount: 150, description: 'Subscription Fee', status: 'completed' },
            { id: '2', date: '2023-08-05', amount: 20, description: 'Extra Storage Fee', status: 'pending' },
        ];
    }
};

const BillingHistory: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isLoading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        const fetchTransactions = async () => {
            dispatch(fetchTransactionsStart());
            try {
                const data = await simulatedAPI.fetchTransactions();
                dispatch(fetchTransactionsSuccess(data));
            } catch (err) {
                dispatch(fetchTransactionsFailure('Failed to fetch transactions. Please try again.'));
            }
        };

        fetchTransactions();
    }, [dispatch]);

    return (
        <div>
            <h2>Billing History</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BillingHistory;

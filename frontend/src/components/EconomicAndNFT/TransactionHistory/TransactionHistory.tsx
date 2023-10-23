import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
    selectTransactions,
    selectTransactionsLoading,
    selectTransactionsError,
    Transaction
} from '../../../store/slices/economicAndNFT/transactionHistorySlice'; // Adjust the path accordingly

const TransactionHistory: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const loading = useSelector(selectTransactionsLoading);
    const error = useSelector(selectTransactionsError);

    // Mock function for fetching transactions; replace with actual API call.
    const fetchTransactionData = async (): Promise<Transaction[]> => {
        // Replace with actual data fetching logic
        const mockTransactions: Transaction[] = [
            {
                id: '1',
                timestamp: new Date(),
                type: 'purchase',
                amount: 2.5,
                asset: 'Sample NFT',
                from: '0x12345678',
                to: '0x98765432',
                status: 'completed'
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockTransactions);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchTransactionsStart());

        fetchTransactionData()
            .then(data => dispatch(fetchTransactionsSuccess(data)))
            .catch(err => dispatch(fetchTransactionsFailure(err.message)));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Transaction History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Asset</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.asset}</td>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.timestamp.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;

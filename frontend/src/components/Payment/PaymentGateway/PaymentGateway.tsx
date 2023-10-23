import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    initiatePayment,
    paymentSuccess,
    paymentFailure,
    resetPaymentStatus,
    selectPaymentStatus,
    selectPaymentError
} from '../../../store/slices/payment/paymentGatewaySlice';

const simulatedPaymentProcess = async (paymentData: { amount: number; paymentMethodId: string }) => {
    try {
        const response = await fetch('https://example.com/api/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        // We're assuming that the API will return a JSON with a 'success' property.
        const result = await response.json();

        return result.success;
    } catch (error: unknown) {
        console.error('Error during simulated payment:', error);
        return false; // You can return false here, or throw an error depending on how you want to handle it.
    }
};

const PaymentGateway: React.FC = () => {
    const dispatch = useDispatch();
    const paymentStatus = useSelector(selectPaymentStatus);
    const error = useSelector(selectPaymentError);

    const handlePayment = async () => {
        dispatch(initiatePayment());

        const paymentData = {
            amount: 100,  // This can be dynamically set based on the user's cart or order details
            paymentMethodId: 'token12345'  // This is just a mock token. Replace with a real token from your payment provider.
        };

        const isSuccess = await simulatedPaymentProcess(paymentData);
        
        if (isSuccess) {
            dispatch(paymentSuccess());
        } else {
            dispatch(paymentFailure('Payment failed. Please try again.'));
        }
    };

    const resetPayment = () => {
        dispatch(resetPaymentStatus());
    };

    return (
        <div>
            <h2>Payment Gateway</h2>

            {paymentStatus === 'idle' && <button onClick={handlePayment}>Initiate Payment</button>}
            {paymentStatus === 'pending' && <p>Processing payment...</p>}
            {paymentStatus === 'completed' && (
                <div>
                    <p>Payment successful!</p>
                    <button onClick={resetPayment}>Reset Payment</button>
                </div>
            )}
            {paymentStatus === 'failed' && (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={resetPayment}>Reset Payment</button>
                </div>
            )}
        </div>
    );
};

export default PaymentGateway;

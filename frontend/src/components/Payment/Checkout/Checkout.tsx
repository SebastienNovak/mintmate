import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeFromCart,
    updateBillingInfo,
    initiatePayment,
    paymentSuccess,
    paymentFailure,
    selectCart,
    selectBillingInfo,
    selectPaymentStatus,
    selectCheckoutError,
    CartItem
} from '../../../store/slices/payment/checkoutSlice';

interface BillingInfoType {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

// Simulated API for the payment process
const simulatedPaymentAPI = {
    processPayment: async (billingInfo: BillingInfoType) => {
        try {
            const response = await fetch('https://example.com/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billingInfo),
            });

            const result = await response.json();
            
            if (result.success) {
                return true;
            } else {
                throw new Error(result.message || 'Payment failed. Please try again.');
            }
        } catch (error: unknown) {
            if (error instanceof Error) { 
                console.error('Payment error:', error.message);
            } else {
                console.error('Payment error:', error);
            }
            throw error;
        }
    }
};

const Checkout: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const billingInfo = useSelector(selectBillingInfo);
    const storeBillingInfo = useSelector(selectBillingInfo);
    const [localBillingInfo, setLocalBillingInfo] = useState(storeBillingInfo);
    const paymentStatus = useSelector(selectPaymentStatus);
    const error = useSelector(selectCheckoutError);

    const handleBillingInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedBillingInfo = {
            ...localBillingInfo,
            [name]: value,
        };
        setLocalBillingInfo(updatedBillingInfo);
        dispatch(updateBillingInfo(updatedBillingInfo));
    };

    const handleCheckout = async () => {
        dispatch(initiatePayment());
        
        const isSuccess = await simulatedPaymentAPI.processPayment(billingInfo);
        
        if (isSuccess) {
            dispatch(paymentSuccess());
        } else {
            dispatch(paymentFailure('Payment failed. Please check your details and try again.'));
        }
    };

    return (
        <div>
            <h2>Checkout</h2>

            <div>
                <h3>Cart</h3>
                <ul>
                    {cart.map((item: CartItem) => (
                        <li key={item.productId}>
                            {item.name} ({item.quantity}) - ${item.price.toFixed(2)}
                            <button onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Billing Info</h3>
                <div>
                    <label>Address: </label>
                    <input name="address" value={localBillingInfo.address} onChange={handleBillingInfoChange} />
                </div>
                <div>
                    <label>City: </label>
                    <input name="city" value={localBillingInfo.city} onChange={handleBillingInfoChange} />
                </div>
                {/* ... (similar input fields for other billing properties) */}
            </div>

            <div>
                <button onClick={handleCheckout} disabled={paymentStatus === 'pending'}>
                    {paymentStatus === 'pending' ? 'Processing...' : 'Checkout'}
                </button>
            </div>

            {paymentStatus === 'completed' && <p>Payment successful!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Checkout;

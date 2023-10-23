import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateRefund, resetRefundStatus, selectRefundStatus, selectRefundError } from '../../../store/slices/other/refundRequestSlice';

const RefundRequest: React.FC = () => {
    const dispatch = useDispatch();

    const refundStatus = useSelector(selectRefundStatus);
    const error = useSelector(selectRefundError);

    const [orderId, setOrderId] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Dispatch the action to initiate the refund
        dispatch(initiateRefund({ orderId, reason }));
    };

    if (refundStatus === 'completed') {
        // Reset the state after showing the success message (optional)
        setTimeout(() => {
            dispatch(resetRefundStatus());
        }, 3000);
    }

    return (
        <div>
            {refundStatus === 'idle' || refundStatus === 'failed' ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Order ID:</label>
                        <input value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
                    </div>
                    <div>
                        <label>Reason:</label>
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
                    </div>
                    <button type="submit">Request Refund</button>
                </form>
            ) : null}

            {refundStatus === 'pending' && <p>Processing refund request...</p>}
            {refundStatus === 'completed' && <p>Refund request successful!</p>}
            {refundStatus === 'failed' && <p>Error processing refund: {error}</p>}
        </div>
    );
};

export default RefundRequest;

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateForm,
    submitStart,
    submitSuccess,
    submitFailure,
    selectFormData,
    selectValidationErrors,
    selectIsLoading,
    selectSubmittedSuccessfully,
    selectServerMessage
} from '../../store/slices/feedbackAndSupport/feedbackFormSlice'; // Update path accordingly

const FeedbackForm: React.FC = () => {
    const dispatch = useDispatch();
    const formData = useSelector(selectFormData);
    const validationErrors = useSelector(selectValidationErrors);
    const loading = useSelector(selectIsLoading);
    const submittedSuccessfully = useSelector(selectSubmittedSuccessfully);
    const serverMessage = useSelector(selectServerMessage);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        dispatch(updateForm({ [name]: value }));
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Here, you should perform client-side validation and dispatch setValidationErrors if needed

        dispatch(submitStart());

        try {
            // Mocking an API call
            // You should replace this with your actual API call to submit feedback
            await new Promise(resolve => setTimeout(resolve, 1000));

            dispatch(submitSuccess('Feedback submitted successfully!'));
        } catch (error) {
            dispatch(submitFailure('Failed to submit feedback. Please try again.'));
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>Feedback Form</h2>

            {submittedSuccessfully === true && <div className="success">{serverMessage}</div>}
            {submittedSuccessfully === false && <div className="error">{serverMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {validationErrors.name && <span className="error">{validationErrors.name}</span>}
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {validationErrors.email && <span className="error">{validationErrors.email}</span>}
                </div>

                <div>
                    <label>Message:</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                    />
                    {validationErrors.message && <span className="error">{validationErrors.message}</span>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;

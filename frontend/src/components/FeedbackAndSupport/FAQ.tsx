import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFAQs,
    selectLoadingStatus,
    selectError,
    searchFAQs,
    incrementViewCount
} from '../../store/slices/feedbackAndSupport/FAQSlice'; // Update path accordingly

const FAQ: React.FC = () => {
    const dispatch = useDispatch();
    const faqs = useSelector(selectFAQs);
    const loading = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchFAQs(event.target.value));
    }, [dispatch]);

    const handleFAQClick = useCallback((faqId: number) => {
        dispatch(incrementViewCount(faqId));
    }, [dispatch]);

    return (
        <div className="faq-section">
            <h2>FAQs</h2>

            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}

            <input 
                type="text" 
                placeholder="Search FAQs..." 
                onChange={handleSearchChange} 
                className="faq-search"
            />

            <ul className="faq-list">
                {faqs.map(faq => (
                    <li key={faq.id} className="faq-item" onClick={() => handleFAQClick(faq.id)}>
                        <h3 className="faq-question">{faq.question}</h3>
                        <p className="faq-answer">{faq.answer}</p>
                        <span className="faq-views">Views: {faq.views}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQ;

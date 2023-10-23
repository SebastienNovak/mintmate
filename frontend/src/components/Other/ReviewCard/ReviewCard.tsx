import React from 'react';
import { useDispatch } from 'react-redux';
import { editReview, deleteReview, Review } from '../../../store/slices/other/reviewCardSlice';

type ReviewCardProps = {
    review: Review;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        const updatedReviewText = prompt("Update your review:", review.reviewText);
        if (updatedReviewText) {
            dispatch(editReview({ ...review, reviewText: updatedReviewText }));
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
            dispatch(deleteReview(review.id));
        }
    };

    return (
        <div className="review-card">
            <p>{review.reviewText}</p>
            <div>Rating: {review.rating} stars</div>
            <div>Date: {new Date(review.date).toLocaleDateString()}</div>
            <div>User ID: {review.userId}</div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ReviewCard;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview, deleteReview, selectReviewById } from '../../store/slices/other/reviewCardSlice';
import { RootState } from '../../store/store';

type ReviewCardProps = {
    reviewId: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewId }) => {
    const dispatch = useDispatch();
    const review = useSelector((state: RootState) => selectReviewById(state, reviewId));

    if (!review) return <div>Review not found!</div>;

    const handleEdit = () => {
        // Here you can open a modal or redirect to an edit page where the user can edit the review
        // For the sake of this example, I'm just dispatching the editReview action directly
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

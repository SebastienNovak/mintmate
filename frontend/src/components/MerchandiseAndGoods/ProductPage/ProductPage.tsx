import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadProducts,
    viewProduct,
    addReview,
    addToCart,
    setError,
    selectProductList,
    selectCurrentProduct,
    selectReviewsForProduct,
    selectLoadingStatus,
    selectError
} from '../../../store/slices/merchandiseAndGoods/productPageSlice';  // Update this to the actual path of your Redux slice
import { RootState } from '../../../store/store';

const ProductPage: React.FC = () => {
    const dispatch = useDispatch();

    // State for review form inputs
    const [rating, setRating] = useState<number | string>('');
    const [comment, setComment] = useState('');

    // Selectors
    const productList = useSelector(selectProductList);
    const currentProduct = useSelector(selectCurrentProduct);
    const reviews = useSelector((state: RootState) => currentProduct ? selectReviewsForProduct(state, currentProduct.id) : []);
    const loadingStatus = useSelector(selectLoadingStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Replace this with your actual fetch logic
                const response = await fetch('yourProductsEndpoint');
                const products = await response.json();
                dispatch(loadProducts(products));
            } catch (error) {
                dispatch(setError('Error fetching products'));
            }
        }
        
        fetchProducts();
    }, [dispatch]);

    const handleAddToCart = (productId: number) => {
        dispatch(addToCart(productId));
    };

    const handleAddReview = () => {
        if (currentProduct) {
            const newReview = {
                productId: currentProduct.id,
                userId: 'sampleUser',  // Replace this with actual user ID from your authentication system
                rating: Number(rating),
                comment,
                reviewDate: new Date()
            };
            dispatch(addReview(newReview));
            setRating('');
            setComment('');
        }
    };

    return (
        <div>
            <h2>Products</h2>

            {loadingStatus === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {productList.map(product => (
                    <li key={product.id}>
                        <button onClick={() => dispatch(viewProduct(product.id))}>{product.name}</button>
                    </li>
                ))}
            </ul>

            {currentProduct && (
                <div>
                    <h3>{currentProduct.name}</h3>
                    <img src={currentProduct.imageUrl} alt={currentProduct.name} width="200" />
                    <p>{currentProduct.description}</p>
                    <p>${currentProduct.price} (In stock: {currentProduct.stock})</p>
                    <button onClick={() => handleAddToCart(currentProduct.id)}>Add to Cart</button>

                    <h4>Reviews</h4>
                    {reviews.map(review => (
                        <div key={`${review.productId}-${review.userId}`}>
                            <p>{review.rating} out of 5 stars</p>
                            <p>{review.comment}</p>
                            <p>Reviewed by {review.userId} on {review.reviewDate.toLocaleDateString()}</p>
                        </div>
                    ))}

                    <h4>Add a Review</h4>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review" />
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>
            )}
        </div>
    );
};

export default ProductPage;

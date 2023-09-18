import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    selectFeaturedProducts,
    selectCategories,
    selectRecentReviews,
    selectLoading,
    selectError,
    Product,
    Category,
    Review
} from '../../store/slices/economicAndNFT/marketplaceLandingSlice';  // Make sure to provide the correct path

type MarketplaceData = {
    products: Product[];
    categories: Category[];
    reviews: Review[];
};

// This is just a placeholder mock function
const fetchMarketplaceData = async (): Promise<MarketplaceData> => {
    // Mocked data for demonstration purposes
    const mockData = {
        products: [
            {
                id: '1',
                name: 'Sample Product 1',
                price: 100,
                imageUrl: 'path-to-image1.jpg',
                description: 'This is a sample product 1',
                category: 'Category1'
            },
            {
                id: '2',
                name: 'Sample Product 2',
                price: 200,
                imageUrl: 'path-to-image2.jpg',
                description: 'This is a sample product 2',
                category: 'Category2'
            }
        ],
        categories: [
            { id: '1', name: 'Category1' },
            { id: '2', name: 'Category2' }
        ],
        reviews: [
            {
                id: '1',
                productId: '1',
                reviewerName: 'John Doe',
                content: 'This is a great product!',
                rating: 5
            },
            {
                id: '2',
                productId: '2',
                reviewerName: 'Jane Smith',
                content: 'This product could be better.',
                rating: 3
            }
        ]
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
};    

const MarketplaceLanding: React.FC = () => {
    const dispatch = useDispatch();
    const featuredProducts = useSelector(selectFeaturedProducts);
    const categories = useSelector(selectCategories);
    const recentReviews = useSelector(selectRecentReviews);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchDataStart());

        fetchMarketplaceData()
            .then(data => dispatch(fetchDataSuccess(data)))
            .catch(err => dispatch(fetchDataFailure(err.message)));
    }, [dispatch]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Marketplace</h1>
            <section>
                <h2>Featured Products</h2>
                {featuredProducts.map(product => (
                    <div key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                    </div>
                ))}
            </section>
            
            <section>
                <h2>Categories</h2>
                <ul>
                    {categories.map(category => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </section>
            
            <section>
                <h2>Recent Reviews</h2>
                {recentReviews.map(review => (
                    <div key={review.id}>
                        <p><strong>{review.reviewerName}</strong> rated it {review.rating}/5</p>
                        <p>{review.content}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MarketplaceLanding;

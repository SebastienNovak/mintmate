import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setItems,
    nextItem,
    previousItem,
    toggleAutoplay,
    selectCurrentItem,
    selectAutoplayStatus,
    CarouselItem
} from '../../../store/slices/interactivity/carouselSlice';  // Update path accordingly

const mockItems: CarouselItem[] = [
    {
        id: '1',
        contentUrl: 'https://example.com/image1.jpg',
        description: 'Image 1 description'
    },
    {
        id: '2',
        contentUrl: 'https://example.com/image2.jpg',
        description: 'Image 2 description'
    },
    // ... Add more mock items as desired
];

const Carousel: React.FC = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(selectCurrentItem);
    const autoplay = useSelector(selectAutoplayStatus);

    const autoplayRef = useRef<number | null>(null);

    useEffect(() => {
        dispatch(setItems(mockItems));

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [dispatch]);

    useEffect(() => {
        if (autoplay) {
            autoplayRef.current = setInterval(() => {
                dispatch(nextItem());
            }, 5000) as unknown as number; // Here you're asserting that you know it's a number            
            return () => {
                if (autoplayRef.current) clearInterval(autoplayRef.current);
            };
        }
    }, [autoplay, dispatch]);

    return (
        <div>
            {currentItem && (
                <div className="carousel-container">
                    <img src={currentItem.contentUrl} alt={currentItem.description} />
                    <p>{currentItem.description}</p>
                    <button onClick={() => dispatch(previousItem())}>&lt; Prev</button>
                    <button onClick={() => dispatch(nextItem())}>Next &gt;</button>
                </div>
            )}
            <button onClick={() => dispatch(toggleAutoplay())}>
                {autoplay ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Carousel;

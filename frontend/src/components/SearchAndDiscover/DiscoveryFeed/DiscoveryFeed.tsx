import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDiscoveryContent,
    selectIsLoading,
    selectError,
    DiscoveryFeedState
} from '../../../store/slices/searchAndDiscover/discoveryFeedSlice';
import { AppDispatch } from '../../../store/store';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './discoveryFeed.scss';

interface DiscoveryFeedProps {
    data: DiscoveryFeedState;
}

interface CardData {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    // Add other fields like 'type' and 'date' if they are part of your data structure
}

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    // const swiperRef = useRef(null);

    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
        dispatch(fetchDiscoveryContent());
    }, [dispatch]);

    useEffect(() => {
        console.log("Card data:", cardData); // Check the structure of card data
    }, [cardData]);

    useEffect(() => {
        // Fetch data or use static data
        const sampleData = [
            { id: 1, title: 'Card 1', imageUrl: 'Adele.jpeg', description: 'Description 1' },
            { id: 2, title: 'Card 2', imageUrl: 'Beatles.jpeg', description: 'Description 2' },
            { id: 3, title: 'Card 3', imageUrl: 'Beyonce_Formation_World_Tour_poster.jpeg', description: 'Description 2' },
            { id: 4, title: 'Card 4', imageUrl: 'Bon_Jovi.jpeg', description: 'Description 2' },
            { id: 5, title: 'Card 5', imageUrl: 'David_Bowie.jpeg', description: 'Description 2' },
            ];
            setCardData(sampleData);
    }, []);

    if (cardData.length === 0) {
        return <div className="loading-state">Loading...</div>;
    }


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="discovery-feed-wrapper">
            <div className="discovery-feed">
                {cardData.length > 0 && (
                    <Swiper
                        modules={[Pagination]}
                        // slidesPerView={3}
                        loop={true}
                        key={JSON.stringify(cardData)}
                        pagination={{ clickable: true }}
                        allowSlidePrev={true} 
                        slidesPerView='auto'
                    >
                        {cardData.map(item => (
                            <SwiperSlide key={item.id}>
                                <div className="content-item">
                                    <a href={`/details/${item.id}`}>
                                        <img src={`/discoveryBanners/${item.imageUrl}`} alt={item.title} />
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default DiscoveryFeed;
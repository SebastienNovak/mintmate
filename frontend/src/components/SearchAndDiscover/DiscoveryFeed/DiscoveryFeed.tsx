import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDiscoveryContent,
    selectIsLoading,
    selectError,
    DiscoveryFeedState
} from '../../../store/slices/searchAndDiscover/discoveryFeedSlice';
import { AppDispatch } from '../../../store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './style.scss';

interface DiscoveryFeedProps {
    data: DiscoveryFeedState;
}

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const swiperRef = useRef(null);

    useEffect(() => {
        dispatch(fetchDiscoveryContent());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="discovery-feed-wrapper">
            <div className="discovery-feed">
                <Swiper
                    ref={swiperRef}
                    effect="cards"
                    slidesPerView={3}
                    spaceBetween={20}
                    mousewheel={true}
                    loop={true}
                    shortSwipes={true}
                    longSwipes={false}
                    modules={[Mousewheel, Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: { slidesPerView: 2, spaceBetween: 20 },
                        600: { slidesPerView: 1, spaceBetween: 10 }
                    }}
                >
                    {data.content.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="content-item">
                                <a href={`/details/${item.id}`}>
                                    <img src={item.imageUrl} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <span>{item.type} - {item.date}</span>
                                    <div className="action-btn">Explore</div>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DiscoveryFeed;

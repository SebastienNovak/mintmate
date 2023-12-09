import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDiscoveryContent,
    selectIsLoading,
    selectError,
    DiscoveryFeedState
} from '../../../store/slices/searchAndDiscover/discoveryFeedSlice';
import { AppDispatch } from '../../../store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './discoveryFeed.scss';
import SwiperCore from 'swiper'; // Importing Swiper type

interface DiscoveryFeedProps {
    data: DiscoveryFeedState;
}

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        dispatch(fetchDiscoveryContent());
    }, [dispatch]);

    const handleSlideChange = (swiper: SwiperCore) => {
        setActiveSlide(swiper.realIndex);
    };

    const goToSlide = (index: number) => {
        if (swiperInstance) {
            swiperInstance.slideTo(index);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="discovery-feed-wrapper">
            <div className="discovery-feed">
                <Swiper
                    onSwiper={setSwiperInstance}
                    effect="cards"
                    slidesPerView={3}
                    spaceBetween={20}
                    mousewheel={{
                        forceToAxis: true,
                        releaseOnEdges: true,
                    }}
                    loop={true}
                    shortSwipes={true}
                    longSwipes={false}
                    modules={[Mousewheel]}
                    onSlideChange={handleSlideChange}
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
                <div className="custom-pagination">
                    {data.content.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscoveryFeed;

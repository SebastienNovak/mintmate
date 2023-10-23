import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchModerationItems, 
    selectModerationItems,
    selectPaginationInfo,
    selectIsLoading,
    selectError,
    setPage
} from '../../../store/slices/safetyAndModeration/moderationQueueSlice';
import { AppDispatch } from '../../../store/store';

const ModerationQueue: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector(selectModerationItems);
    const pagination = useSelector(selectPaginationInfo);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchModerationItems(pagination.currentPage));
    }, [pagination.currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <span>Submitted by: {item.authorId} on {item.dateSubmitted}</span>
                    </li>
                ))}
            </ul>
            <div>
                <span>Page {pagination.currentPage} of {Math.ceil(pagination.totalItems / pagination.itemsPerPage)}</span>
                <button disabled={pagination.currentPage === 1} onClick={() => handlePageChange(pagination.currentPage - 1)}>Previous</button>
                <button disabled={pagination.currentPage * pagination.itemsPerPage >= pagination.totalItems} onClick={() => handlePageChange(pagination.currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default ModerationQueue;

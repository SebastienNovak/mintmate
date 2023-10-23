import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCurrentPage,
    nextPage,
    prevPage,
    selectCurrentPage,
    selectTotalPages
} from '../../../store/slices/utility/paginationSlice';

const Pagination: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const totalPages = useSelector(selectTotalPages);

    const handlePageClick = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    };

    return (
        <div className="pagination-container">
            <button
                onClick={() => dispatch(prevPage())}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            
            {[...Array(totalPages).keys()].map(index => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={currentPage === pageNumber ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => dispatch(nextPage())}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;

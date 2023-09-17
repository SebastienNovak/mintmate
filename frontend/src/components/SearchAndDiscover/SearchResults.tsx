import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSearchResults, 
    selectResults,
    selectPaginationInfo,
    selectIsLoading,
    selectError,
    setPage
} from '../../store/slices/searchAndDiscover/searchResultsSlice';
import { AppDispatch } from '../../store/store';

interface SearchResultsProps {
    query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
    const dispatch = useDispatch<AppDispatch>();
    const results = useSelector(selectResults);
    const pagination = useSelector(selectPaginationInfo);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        // Fetch initial results when the component mounts and the query changes
        dispatch(fetchSearchResults(query, pagination.currentPage));
    }, [query, pagination.currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                    </li>
                ))}
            </ul>
            <div>
                <span>Page {pagination.currentPage} of {Math.ceil(pagination.totalResults / pagination.resultsPerPage)}</span>
                <button disabled={pagination.currentPage === 1} onClick={() => handlePageChange(pagination.currentPage - 1)}>Previous</button>
                <button disabled={pagination.currentPage * pagination.resultsPerPage >= pagination.totalResults} onClick={() => handlePageChange(pagination.currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default SearchResults;

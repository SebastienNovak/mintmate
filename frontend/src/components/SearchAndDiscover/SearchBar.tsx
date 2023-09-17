import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setQuery, 
    executeSearch, // Uncomment once you've defined the thunk function.
    selectQuery, 
    selectResults,
    selectIsLoading,
    selectError
} from '../../store/slices/searchAndDiscover/searchBarSlice';
import { AppDispatch } from '../../store/store';

const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState(''); // Local state for the input value

    const dispatch = useDispatch<AppDispatch>();

    const query = useSelector(selectQuery);
    const results = useSelector(selectResults);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSearch = () => {
        dispatch(setQuery(inputValue));
        dispatch(executeSearch(inputValue)); // Calls the thunk function to execute the search.
    }

    return (
        <div className="search-container">
            <div className="search-bar">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder="Search..." 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul className="search-results">
                {results.map(result => (
                    <li key={result.id}>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                    </li>
                ))}
            </ul>
            <p>Current Query: {query}</p>
        </div>
    );
};

export default SearchBar;

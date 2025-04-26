import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    // Debounced search function
    const debouncedSearch = debounce(async (searchTerm) => {
        if (!searchTerm) return;

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/ticket/search?query=${searchTerm}`);
            const data = response.data;

            navigate('/results', { state: { results: data, searchTerm: searchTerm } });

            setResults(data);
            setNoResults(data.length === 0);
        } catch (error) {
            console.error('Error searching tickets:', error);
        } finally {
            setLoading(false);
        }
    }, 500); // 500ms debounce

    // Watch the query state
    useEffect(() => {
        debouncedSearch(query);

        // Cleanup debounce on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [query]);

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search concerts, sports, theater..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default SearchBar;

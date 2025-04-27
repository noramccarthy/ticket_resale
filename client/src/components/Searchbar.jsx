import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            const response = await api.get(`/ticket/search?query=${query}`);
            const data = response.data;

            if (data.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
                navigate('/results', { state: { results: data, searchTerm: query } });
            }
        } catch (error) {
            console.error('Error searching tickets:', error);
            setNoResults(true);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-bar" style={{ color: '#888'}}
            />
            <i className="fas fa-search search-bar-icon"></i>
            {loading && <p>Loading...</p>}
            {!loading && noResults && (
                <p className="no-results-message">No results found for "{query}"</p>
            )}
        </div>
    );
};

export default SearchBar;
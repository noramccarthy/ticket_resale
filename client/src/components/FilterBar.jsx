import React, { useState } from 'react';
import '../css/FilterBar.css'

const FilterBar = ({categories, onSearchFilter, onCategoryFilter, states, onStateFilter}) => {
    const [filters, setFilters] = useState({
        searchInput: "",
        state: "",
        category:""
    })

    const handleFilter = (field) => (event) => {
        const {value} = event.target;

        setFilters({
            ...filters,
            [field]: value,
        })

        switch(field) {
            case 'searchInput':
                // pass value back to parent 
                onSearchFilter(value);
                break;

            case 'category':
                onCategoryFilter(value);
                break;

            case 'state':
                onStateFilter(value);
                break;

            default:
                break;
        }
    }


    return (
        <div className="filter-bar-container">
            <div className="filters-header">
                <h2>Filters</h2>
            </div>
            <div className="filters-row">
                <div className="filter-search-wrapper">
                    <input
                        type="text"
                        className="filter-search-input"
                        placeholder="Search..."
                        value={filters.searchInput}
                        onChange={handleFilter("searchInput")}
                    />
                </div>
                <select
                    className="filter-select"
                    onChange={handleFilter("state")}
                    defaultValue=""
                >
                    <option value="" disabled>State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state.stateName}>
                            {state.stateName}
                        </option>
                    ))}
                </select>

                {/* Categories Select */}
                <select
                    className="filter-select"
                    onChange={handleFilter("category")}
                    defaultValue=""
                >
                    <option value="" disabled>Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.seatgeekName}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default FilterBar;
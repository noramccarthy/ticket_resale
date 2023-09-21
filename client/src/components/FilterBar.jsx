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
        <>

        <div className='filter-bar-container'>
            <div className='row my-5'>
                <div className="col">
                    <h4 className="border-bottom">Filters</h4>
                </div>
            </div>

            <div className="row line-2">
                <div className="col">
                    <label htmlFor="name">Search</label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Artist, event, team..."
                        id="searchbar"
                        value={filters.searchInput}
                        onChange={handleFilter("searchInput")}
                    />
                </div>

                <div className="col">
                    <label htmlFor="state">State</label>

                    <select 
                        className="form-control"
                        id="state"
                        onChange={handleFilter("state")}
                    >

                        <option value="" disabled selected>States</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.stateName}>
                                    {state.stateName}
                                </option>
                                ))
                            }
                    </select>
                </div>

                <div className="col">
                    <label htmlFor="category">Category</label>

                    <select 
                        className="form-control"
                        id="category"
                        onChange={handleFilter("category")}
                    >

                        <option value="" disabled selected>Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.seatgeekName}>
                                    {category.categoryName}
                                </option>
                                ))
                            }
                    </select>
                </div>
            </div>
        </div>
        </>
    );
}

export default FilterBar;
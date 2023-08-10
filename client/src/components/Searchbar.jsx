import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({onSearchFilter, handleSubmit}) => {
    const [searchInput, setSearchInput] = useState("");


    const handleFilter = (event) => {
        setSearchInput(event.target.value);
        // console.log("Search input", searchInput)
        onSearchFilter(event.target.value);
    }

    return (
        <>
        <div>

            <form onSubmit={handleSubmit}>
                <FaSearch id="search-icon"/>
                <input
                    type="text"
                    className='searchbar'
                    placeholder="Search a performer..."
                    value={searchInput}
                    onChange={handleFilter}
                />

                <button type='submit'>Search</button>
            </form>
        </div>
        </>
    )
    
}

export default SearchBar;
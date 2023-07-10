import '../css/Searchbar.css'


const Searchbar = ({searchInput, handleSearchChange}) => {

    return (
        <>
        <div>
            <input
                type="text"
                className='searchbar'
                placeholder="Artist, event, team"
                value={searchInput}
                onChange={handleSearchChange}
            />
        </div>
        </>
    )
    
}

export default Searchbar;
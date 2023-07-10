


// child 1
function Filter({callback}) {
    return (
        // searchInput => callback()
    )
}

// parent
function Parent() {
    const [tickets, setTickets] = useState([]);

    return (
        <>
        <Display keyword={keyword}/>
        <Display categoryName={categoryName}/>
        <Display stateName={stateName}/>
        </>
    )
}

// child 2
function Display({keyword, categoryName, stateName}){
    return <div>{keyword, categoryName, stateName}</div>
}
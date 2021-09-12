const Header = (props) => {

    const passQuery = (e) => {
        e.preventDefault();
        props.setQuery(e.target[0].value);
    }

    return (
        <header>
            <div className="wrapper">
                <h1>Outta This World... <span className="sub">Image Search</span> <span className="ship">🛸</span></h1>
                <form onSubmit={(e) => passQuery(e)}>
                    <label htmlFor="search" className="sr-only">Enter your search: </label>
                    <input type="text" id="search" placeholder="Search for space stuff!" />
                    <input type="submit" value="Search" />
                </form>
                <p className="star star1">⋆</p>
                <p className="star star2">⋆</p>
                <p className="star star3">⋆</p>
            </div>
        </header>
    )
}

export default Header
import { useEffect } from "react";

const Header = (props) => {

    const passQuery = (e) => {
        e.preventDefault();
        props.setQuery(e.target[0].value);
    }

    useEffect(() => {
        document.querySelectorAll(".star").forEach((star) => {
            star.style.top = `${Math.ceil(Math.random()*90)}%` 
            star.style.left = `${Math.ceil(Math.random()*90)}%` 
        });

    }, []);

    return (
        <header>
            <div className="wrapper">
                <h1>Outta This World... <span className="sub">Image Search</span> <span className="ship">🛸</span></h1>
                <form onSubmit={(e) => passQuery(e)}>
                    <label htmlFor="search" className="sr-only">Enter your search: </label>
                    <input type="text" id="search" placeholder="Search for space stuff!" />
                    <input type="submit" value="Search 🚀" />
                </form>
                <p className="star">⋆</p>
                <p className="star">⋆</p>
                <p className="star">⋆</p>
                <p className="star">⋆</p>
                <p className="star">⋆</p>
                <p className="star">⋆</p>
            </div>
        </header>
    )
}

export default Header
import { useEffect, useState } from "react";
import Loading from './Loading';
import NoResults from './NoResults'

const ImageData = (props) => {

    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("pluto");
    const [likes, setLikes] = useState([]);
    const [hits, setHits] = useState(1);

    useEffect(() => {
        if (localStorage.getItem("Likes") === null || undefined) {
            localStorage.setItem("Likes", "[]");
        }
        
        setLikes(JSON.parse(localStorage.getItem("Likes")));
        setQuery(props.query)
    }, [props]);

    useEffect(() => {
      const url = new URL("https://images-api.nasa.gov/search");
      url.search = new URLSearchParams({
        q: query
      });
    
      fetch(url).then((data) => {
        return data.json()
      }).then((jsonData) => {
        setResults(jsonData.collection.items)
        setHits(jsonData.collection.metadata.total_hits)
        setLoading(false)
      })
    }, [query])

    const like = (e) => {
        if (localStorage.getItem("Likes") === null || undefined) {
            localStorage.setItem("Likes", "[]");
        }

        const likes = JSON.parse(localStorage.getItem("Likes"));

        if (JSON.parse(localStorage.getItem("Likes")).includes(e.target.attributes.id.value)) {
            const filteredLikes = likes.filter((item) => {
                return item !== e.target.attributes.id.value;
            });
            const string = JSON.stringify(filteredLikes);
            localStorage.setItem("Likes", string);
            setLikes(JSON.parse(localStorage.getItem("Likes")));
        } else {
            likes.push(e.target.attributes.id.value);
            const string = JSON.stringify(likes);
            localStorage.setItem("Likes", string);
            setLikes(JSON.parse(localStorage.getItem("Likes")));
        }
    }
 
    return (
        <main className="wrapper">
            { 
                loading 
                ? <Loading />
                : hits === 0
                    ? <NoResults />
                    : <ul className="queryGrid">
                        { results.map(element => {
                        return (
                            !element.links
                            ? null
                            :
                            <li key={element.data[0].nasa_id} className="elementGrid">
                                <div className="imageContainer">
                                    <img src={element.links[0].href} alt={`A photograph titled: ${element.data[0].title}`}/>
                                    {
                                        likes.includes(element.data[0].nasa_id)
                                        ?                                 <button className="like" style={{color: "#FF0000"}} id={element.data[0].nasa_id} onClick={(e) => like(e)}>♥</button>
                                        :                                 <button className="like" id={element.data[0].nasa_id} onClick={(e) => like(e)}>♥</button>
                                    }
                                </div>
                                <div className="desc">
                                    <p className="title">{element.data[0].title}</p>
                                    <p className="date">{element.data[0].date_created.slice(0, 10)}</p>
                                    <p className="desc508">{
                                    element.data[0].description_508
                                    ? element.data[0].description_508
                                    : element.data[0].description
                                    }</p>
                                    <div className="sharableLink">
                                        <p className="linkText">{element.links[0].href}</p>
                                        <p className="linkIcon">🔗</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })} 
                    </ul>
            }
        </main>
    )
}

export default ImageData
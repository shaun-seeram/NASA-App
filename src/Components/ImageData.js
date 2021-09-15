import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import Loading from './Loading';
import NoResults from './NoResults';

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
    }, []);

    useEffect(() => {
        setQuery(props.query)
    }, [props]);

    useEffect(() => {
      const url = new URL("https://images-api.nasa.gov/search");
      url.search = new URLSearchParams({
        q: query,
        media_type: "image"
      });
    
      fetch(url).then((data) => {
        return data.json()
      }).then((jsonData) => {
        setResults(jsonData.collection.items)
        setHits(jsonData.collection.metadata.total_hits)
        setLoading(false)
      })
    }, [query])
 
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
                                    <LikeButton likes={likes} setLikes={setLikes} element={element.data[0].nasa_id}/>
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
const LikeButton = (props) => {

    const like = (e) => {
        const likes = JSON.parse(localStorage.getItem("Likes"));

        if (likes.includes(e.target.attributes.id.value)) {
            const filteredLikes = likes.filter((item) => {
                return item !== e.target.attributes.id.value;
            });
            const string = JSON.stringify(filteredLikes);
            localStorage.setItem("Likes", string);
            props.setLikes(JSON.parse(localStorage.getItem("Likes")));
        } else {
            likes.push(e.target.attributes.id.value);
            const string = JSON.stringify(likes);
            localStorage.setItem("Likes", string);
            props.setLikes(JSON.parse(localStorage.getItem("Likes")));
        }
    }

    return (
        props.likes.includes(props.element)
        ? <button aria-label="Unlike" className="like" style={{color: "#FF0000"}} id={props.element} onClick={(e) => like(e)}>♥️</button>
        : <button aria-label="Like" className="like" id={props.element} onClick={(e) => like(e)}>🖤</button>
    )
}

export default LikeButton
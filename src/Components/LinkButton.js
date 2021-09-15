const LinkButton = (props) => {

    const link = () => {
        if (document.querySelector(`.link${props.id}`) === null) {
            const parent = document.querySelector(`.${props.id}`);
            const div = document.createElement("div");
            div.classList.add(`link${props.id}`, "linkDiv");
            const p = document.createElement("p");
            p.textContent = props.img;
            div.appendChild(p);
            parent.appendChild(div)
        } else {
            document.querySelector(`.link${props.id}`).remove()
        }
    }

    return (
        <button aria-label="Sharable link" onClick={link} className="link">🔗</button>
    )
}

export default LinkButton
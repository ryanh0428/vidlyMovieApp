import { useState, useEffect } from "react";
function Like({ onlikeAMovie, theMovie }) {
    const [iconClass, setIconClass] = useState("fa-regular fa-heart clickable");
    useEffect(() => {
        setIconClass(theMovie.like === true ? "fa-solid fa-heart clickable" : "fa-regular fa-heart clickable")
    })
    return (

        <i className={iconClass} onClick={() => onlikeAMovie(theMovie._id)}></i>

    );
}

export default Like;
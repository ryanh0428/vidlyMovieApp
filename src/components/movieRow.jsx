import { useState, useEffect } from "react";


function MovieRow({ id, like, title, genre, stock, rate, onDelete, onLike }) {
    const [iconClass, setIconClass] = useState("fa-regular fa-heart");
    useEffect(() => {
        setIconClass(like === true ? "fa-solid fa-heart" : "fa-regular fa-heart")
    })
    return (

        < tr key={id} >
            <td>{title}</td>
            <td>{genre}</td>
            <td>{stock}</td>
            <td>{rate}</td>
            <td>
                <i className={iconClass} onClick={() => onLike(id)}></i>
            </td >
            <td>
                <button onClick={() => onDelete(id)} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr >
    )
}

export default MovieRow;


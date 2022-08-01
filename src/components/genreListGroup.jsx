import { getGenres } from "../services/fakeGenreService"
function GenreListGroup({ onFilterGenres, currentGenre }) {
    const genreListArray = getGenres();
    genreListArray.unshift({ name: "All Genres" });

    return (
        <div className="list-group">
            {genreListArray.map(genre => {

                return (<a key={genre.name} className={genre.name === currentGenre ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={() => onFilterGenres(genre.name)}>{genre.name}</a>)
            })}

        </div>
    )

}

export default GenreListGroup;

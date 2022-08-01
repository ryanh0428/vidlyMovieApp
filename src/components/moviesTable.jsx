// import MovieRow from "./movieRow"
import Table from "./common/table"
import Like from "./common/like"
function MoviesTable({ moviesByPage, onDelete, onlikeAMovie, onSort, sortColumn }) {
    const columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like', content: movie => (<Like onlikeAMovie={onlikeAMovie} theMovie={movie} />) },
        { key: 'delete', content: movie => (<button onClick={() => onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>) }
    ]
    return (
        <Table columns={columns} onSort={onSort} sortColumn={sortColumn} data={moviesByPage} />);
    {/* <tbody>

                {moviesByPage.map((movieObject) => {

                    return (<MovieRow key={movieObject._id}
                        like={movieObject.like}
                        id={movieObject._id}
                        title={movieObject.title}
                        genre={movieObject.genre.name}
                        stock={movieObject.numberInStock}
                        rate={movieObject.dailyRentalRate}
                        onDelete={onDelete}
                        onLike={onlikeAMovie} />
                    )



                })}

            </tbody> */}

}

export default MoviesTable;
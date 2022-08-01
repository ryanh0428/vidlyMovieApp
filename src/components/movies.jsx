import { getMovies } from "../services/fakeMovieService";
import { useState, useEffect } from "react";
import _ from 'lodash';
import Pagination from "./pagination";
import { paginate } from '../utils/paginate';
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";


const Movies = ({ currentGenre }) => {

    const [movies, setMovie] = useState(getMovies());//we will get the data in the useEffect function
    const [pageSize, setPageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({ _id: '', name: 'All Genres' });
    const [sortColumn, setSortColumn] = useState({ path: "title", order: 'asc' });

    useEffect(() => {
        const gen = [{ _id: "", name: "All Genres" }, ...getGenres()];
        setGenres(gen)
    }, [selectedGenre]);

    if (movies.length === 0) return <p>There are no movies in the database.</p>
    // let moviesByGenre = movies;
    // if (currentGenre !== "All Genres")
    //     moviesByGenre = movies.filter(element => element.genre.name === currentGenre)

    const getPagedData = () => {
        const filtered = selectedGenre && selectedGenre._id ?
            movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const moviesByPage = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: moviesByPage }
    }





    const likeAMovie = (id) => {
        const newMovies = movies.map(movie => {
            if (movie._id === id)
                movie.like = !movie.like;
            console.log(movie.like);
            return movie;
        });
        console.log(newMovies);
        setMovie(newMovies);
    }

    const handleDelete = (id) => {
        setMovie(movies.filter(m => m._id !== id));
    }

    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    const handleGenreSelect = genre => {
        setCurrentPage(1);//if we don't do so, we will looking the movie according to previous currentpage value, which is invalid since we have switch to other genre
        setSelectedGenre(genre);
    }

    const handleSort = sortColumn => {
        // if (sortColumn.path === path)
        //     setSortColumn(sortColumn.order === 'asc' ? { path, order: 'desc' } : { path, order: 'asc' })
        // else
        //     setSortColumn({ path, order: 'asc' })//original form is path:path
        setSortColumn(sortColumn)
    }

    const { totalCount, data } = getPagedData();

    return (
        <div className="row">
            <div className="col-3">
                <ListGroup items={genres} onItemSelect={handleGenreSelect} selectedItem={selectedGenre} />
            </div>
            <div className="col"><p>Showing {totalCount} movies in the database.</p>

                <MoviesTable moviesByPage={data} onDelete={handleDelete} onlikeAMovie={likeAMovie} onSort={handleSort} sortColumn={sortColumn}></MoviesTable>
                <Pagination onPagination={handlePagination} length={totalCount} pageSize={pageSize} currentPage={currentPage} />
            </div>

        </div>

    );
}

export default Movies;
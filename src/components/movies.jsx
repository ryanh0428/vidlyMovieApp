import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import _ from 'lodash';
import Pagination from "./pagination";
import { paginate } from '../utils/paginate';
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/genreService";
import httpService from "../services/httpService"


const Movies = ({ movies, onlikeAMovie, onDelete }) => {


    const [pageSize, setPageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({ _id: '', name: 'All Genres' });
    const [sortColumn, setSortColumn] = useState({ path: "title", order: 'asc' });
    const [searchKeyword, setSearchKeyword] = useState('');


    useEffect(() => {
        const genreGen = async () => {
            let { data } = await getGenres();
            data = [{ _id: "", name: "All Genres" }, ...data]
            setGenres(data)
        }
        genreGen();

    }, []);
    if (movies.length === 0) return <p>There are no movies in the database.</p>
    // let moviesByGenre = movies;
    // if (currentGenre !== "All Genres")
    //     moviesByGenre = movies.filter(element => element.genre.name === currentGenre)

    const getPagedData = () => {
        let filtered = movies;
        if (searchKeyword) {
            filtered = movies.filter(m =>
                m.title.toLowerCase().startsWith(searchKeyword.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = movies.filter(m => m.genre._id === selectedGenre._id)
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const moviesByPage = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: moviesByPage }
    }

    const handleChange = (value) => {
        console.log(value);
        setSearchKeyword(value);
        setSelectedGenre({ _id: '', name: 'All Genres' });
        setCurrentPage(1);
    }




    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    const handleGenreSelect = genre => {
        setCurrentPage(1);//if we don't do so, we will looking the movie according to previous currentpage value, which is invalid since we have switch to other genre
        setSearchKeyword('');
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
            <div className="col">
                <Link to="/movies/new">
                    <button className="btn btn-primary m-2" >New Movie</button>
                </Link>

                <p>Showing {totalCount} movies in the database.</p>
                <div>
                    <input value={searchKeyword} onChange={e => handleChange(e.currentTarget.value)} type="text" className="form-control" />
                </div>

                <MoviesTable moviesByPage={data} onDelete={onDelete} onlikeAMovie={onlikeAMovie} onSort={handleSort} sortColumn={sortColumn}></MoviesTable>
                <Pagination onPagination={handlePagination} length={totalCount} pageSize={pageSize} currentPage={currentPage} />
            </div>

        </div>

    );
}

export default Movies;
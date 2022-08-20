import { useRef, useEffect, useState } from "react";
import Joi from 'joi';
import GenericForm from "./common/genericForm";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie, getMovies } from "../services/moviesService"
import { toast } from 'react-toastify';


function MovieForm({ match, history, getAllMoviesFromServer }) {

    const [data, setdata] = useState({ title: '', genreId: '', numberInStock: '', dailyRentalRate: '' });
    const [genres, setGenres] = useState([]);
    const schema = Joi.object({
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
    })



    useEffect(() => {


        getMovieFromServer();

        getGenreFromServer();
        // setdata({ title: targetMovie[' title' ], genre: targetMovie[' genre.name], numberInStock: targetMovie['numberInStock' ], rate: targetMovie[dailyRentalRate] })
    }, []
    )

    const handleSave = async (data) => {
        console.log('Submitted', data);
        try {
            await saveMovie(data);
            history.push("/movies");
            getAllMoviesFromServer();
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error("Cannot be saved")
            }
        }
    }

    const mapToViewModel = (movie) => {

        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    const getMovieFromServer = async () => {
        const path = match.path;
        if (path === '/movies/new') return;
        const movieId = match.params.id;
        try {
            const { data: movie } = await getMovie(movieId);
            console.log("find a movie", movie)
            setdata(mapToViewModel(movie));
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("ID invalid")
            }
            history.replace("/not-found")
        }
    }

    const getGenreFromServer = async () => {
        const { data } = await getGenres();
        setGenres(data);
    }



    const labels = ['Title', 'Genre', 'Number in Stock', 'Rate'];
    const keys = ['title', 'genreId', 'numberInStock', 'dailyRentalRate'];
    const buttonLabel = 'Save';
    const inputTypes = ["text", "selection", "number", "number"]

    // const doSubmit = () => {
    //     console.log('Submitted');
    //     console.log("I am data", data);
    //     console.log(data);
    //     const saved = saveMovie(data);
    //     history.push("/movies");
    //     console.log(getMovies());
    //     console.log("saved", saved)
    // }
    const handleChangeData = (data) => {
        setdata(data);
    }
    return (
        <div>
            <h1>Movie Form {match.params.id}</h1>
            <GenericForm
                data={data}
                schema={schema}
                onSave={handleSave}
                labels={labels}
                onChangeData={handleChangeData}
                buttonLabel={buttonLabel}
                inputTypes={inputTypes}
                match={match}
                genres={genres}
                keys={keys}
                history={history}


            />
        </div>

    );
}

export default MovieForm;

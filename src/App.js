import './App.css';
import Movies from "./components/movies"
import { Route, Switch, Redirect } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getMovies, deleteMovie, saveMovie } from "./services/moviesService"
import React from 'react';
import GenreListGroup from "./components/genreListGroup"
import NavBar from "./components/navBar"
import Customers from "./components/customers"
import Rentals from './components/rentals';
import NotFound from "./components/notFound";
import MovieForm from './components/MovieForm';
import LoginForm from './components/loginForm';
import RegisterForm from "./components/registerForm";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpService from "./services/httpService";

function App() {
  const [movies, setMovie] = useState([]);//we will get the data in the useEffect function

  useEffect(() => {
    getMoviesFromServer();
  }, [])



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



  const handleDelete = async (id) => {
    const originalMovie = movies;
    setMovie(movies.filter(m => m._id !== id));
    try {
      const deletedMovie = await deleteMovie(id);
      console.log(deletedMovie, "My deleted movie")

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.")
      }
      setMovie(originalMovie);
    }
  }

  const getMoviesFromServer = async () => {
    let { data } = await getMovies();
    console.log("movies", data)
    setMovie(data);
  }




  // const [movieArray] = useState(getMovies());
  // const [currentGenre, setcurrentGenre] = useState("All Genres");
  // const handleFilterGenres = (genre) => {
  //   setcurrentGenre(genre);
  // }

  return (
    // <div className='componentContainer'>
    //   <GenreListGroup onFilterGenres={handleFilterGenres} currentGenre={currentGenre} />
    <>
      <ToastContainer />
      <NavBar />
      <main className='container'>

        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" render={(props) => <LoginForm trytry="I am the props" {...props} />} />
          <Route path="/movies/new" render={(props) => <MovieForm getAllMoviesFromServer={getMoviesFromServer} {...props} />} />
          <Route path="/movies/:id" render={(props) => <MovieForm getAllMoviesFromServer={getMoviesFromServer} {...props} />} />
          <Route path="/movies" render={(props) =>
            <Movies movies={movies} onlikeAMovie={likeAMovie} onDelete={handleDelete} />} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="movies" />
          <Redirect to="/not-found" />

        </Switch>
      </main>
    </>

    // </div>

  );
}

export default App;

import './App.css';
import Movies from "./components/movies"
import { Route, Switch, Redirect } from "react-router-dom"
import { useState } from 'react';
import { getMovies } from "./services/fakeMovieService"
import React from 'react';
import GenreListGroup from "./components/genreListGroup"
import NavBar from "./components/navBar"
import Customers from "./components/customers"
import Rentals from './components/rentals';
import NotFound from "./components/notFound";
import MovieForm from './components/MovieForm';

function App() {
  const [movieArray] = useState(getMovies());
  const [currentGenre, setcurrentGenre] = useState("All Genres");
  const handleFilterGenres = (genre) => {
    setcurrentGenre(genre);
  }

  return (
    // <div className='componentContainer'>
    //   <GenreListGroup onFilterGenres={handleFilterGenres} currentGenre={currentGenre} />
    <>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
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

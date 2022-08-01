import './App.css';
import Movies from "./components/movies"
import { useState } from 'react';
import { getMovies } from "./services/fakeMovieService"
import React from 'react';
import GenreListGroup from "./components/genreListGroup"

function App() {
  const [movieArray] = useState(getMovies());
  const [currentGenre, setcurrentGenre] = useState("All Genres");
  const handleFilterGenres = (genre) => {
    setcurrentGenre(genre);
  }

  return (
    // <div className='componentContainer'>
    //   <GenreListGroup onFilterGenres={handleFilterGenres} currentGenre={currentGenre} />
    <main className='container'>
      <Movies currentGenre={currentGenre} />
    </main>
    // </div>

  );
}

export default App;

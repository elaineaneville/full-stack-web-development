import { useState } from 'react';
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Jurassic Park",
    genre: "Adventure",
    year: 1993
  },
  {
    id: 2,
    title: "The Avengers",
    genre: "Action",
    year: 2012
  },
  {
    id: 3, 
    title: "Finding Nemo",
    genre: "Animation",
    year: 2003
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008
  },
  {
    id: 5,
    title: "Toy Story",
    genre: "Animation",
    year: 1995
  },
  {
    id: 6, 
    title: "The Hangover",
    genre: "Comedy",
    year: 2009
  },
  {
    id: 7, 
    title: "The Notebook",
    genre: "Romance",
    year: 2004
  },
  {
    id: 8, 
    title: "Jumanji",
    genre: "Adventure",
    year: 1995
  }
];

function App() {
  //state information

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);

  //searching and filtering of movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title
      .toLowerCase().includes(search.toLowerCase());

    const matchesGenre = 
      selectedGenre === "All" || 
      movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }); 

  //add and remove favorites
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((movieId) => movieId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  return (
    <div className="App">
      <h1>Movie Finder</h1>
      <p>Search for a movie or filter by genre.</p>

      {/*User input and search*/}
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      {/*Genre filter*/}
      <select 
        value={selectedGenre} 
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Romance">Romance</option>
      </select>

      <p>Movies found: {filteredMovies.length}</p>
      <p>Favorites: {favorites.length}</p>

      {/*Render on filters*/}
      {filteredMovies.length === 0 ? (
        <p>No movies found. Try another search!</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Year: {movie.year}</p>
              <button 
                onClick={() => toggleFavorite(movie.id)}
              >
                {favorites.includes(movie.id) 
                ? "Remove from Favorites" 
                : "Add to Favorites"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
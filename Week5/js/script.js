const movies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Science Fiction",
    releaseYear: 2010,
    rating: 8.8,
    runtime: 148,
    description: "A thief who enters dreams is given a difficult mission."
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
    genre: "Action",
    releaseYear: 1999,
    rating: 8.7,
    runtime: 136,
    description: "A computer hacker learns about the true nature of reality."
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    releaseYear: 1972,
    rating: 9.2,
    runtime: 175,
    description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
  },
  {
    title: "Toy Story",
    director: "John Lasseter",
    genre: "Animation",
    releaseYear: 1995,
    rating: 8.3,
    runtime: 81,
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room."
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    releaseYear: 1994,
    rating: 8.9,
    runtime: 154,
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    title: "Finding Nemo",
    director: "Andrew Stanton",
    genre: "Animation",
    releaseYear: 2003,
    rating: 8.1,
    runtime: 100,
    description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home."
  }
];

function displayMovies(movieList){
    const movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = "";
    movieList.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Description:</strong> ${movie.description}</p>
        `;
        movieContainer.appendChild(movieElement);
    });
}

displayMovies(movies);
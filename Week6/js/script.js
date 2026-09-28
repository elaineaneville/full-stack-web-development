const movies = [
    {
        title: "The Matrix",
        genre: "Science Fiction",
        year: 1999,
        rating: 8.7
    },
    {
        title: "Inception",
        genre: "Action",
        year: 2010,
        rating: 8.8
    },
    {
        title: "The Godfather",
        genre: "Crime",
        year: 1972,
        rating: 9.2
    },
    {
        title: "Pulp Fiction",
        genre: "Crime",
        year: 1994,
        rating: 8.9
    },
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        year: 1994,
        rating: 9.3
    },
    {
        title: "Toy Story",
        genre: "Animation",
        year: 1995,
        rating: 8.3
    },
    {
        title: "Finding Nemo",
        genre: "Animation",
        year: 2003,
        rating: 8.1
    }
];

// Javascript functions
//display movies
function displayMovies(movieArray) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = ""; // Clear existing content
    //map()
    movieArray.map((movie) => {
        movieList.innerHTML += `
            <div class="movie">
                <h2>${movie.title}</h2>
                <p>Genre: ${movie.genre}</p>
                <p>Year: ${movie.year}</p>
                <p class="rating">Rating: ${movie.rating}</p>
            </div>
        `;
    });
}

//show all movies
function showAllMovies() {
    displayMovies(movies);
}

//sort()
function sortAlphabetically() {
    const sortedMovies = [...movies].sort((a,b) => {
        return a.title.localeCompare(b.title);
    });
    displayMovies(sortedMovies);
}
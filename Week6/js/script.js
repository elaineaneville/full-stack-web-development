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
    },
    {
        title: "Test Movie",
        genre: "Animation",
        year: 2000,
        rating: 5.4
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

//filter()
function filterByGenre(){
    const genreInput = prompt("Enter a genre to filter by (e.g., Action, Drama, Animation):");
    if(!genreInput) {
        alert("No genre entered. Please try again.");
        return;
    }
    const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genreInput.toLowerCase());

    displayMovies(filteredMovies);
}

//filter by year
function filterByYear() {
    const yearInput = prompt("Enter a year to filter by (e.g., 1994):");
    if(!yearInput) {
        alert("No year entered. Please try again.");
        return;
    }
    const filteredMovies = movies.filter(movie => movie.year === parseInt(yearInput));

    displayMovies(filteredMovies);
}

//filter by rating
function filterByRating() {
    const filteredRatedMovies = movies.filter(movie => movie.rating >= 8);
    displayMovies(filteredRatedMovies);
}

//find specific movie
function findMovie() {
    const titleInput = prompt("Enter the title of the movie to find:");

    const movieFound = movies.find(movie => movie.title.toLowerCase() === titleInput.toLowerCase());
    if (movieFound) {
        displayMovies([movieFound]);
    } else {
        alert("Movie not found.");
    }
}

//movie stats
function showMovieStats() {
    const totalRating = movies.reduce((total, movie) => {
         return total + movie.rating;
        }, 0);
    const averageRating = (totalRating / movies.length).toFixed(2);
    
    const stats = document.getElementById("stats");

    stats.innerHTML = `
        <h2>Movie Statistics</h2>
        <p>Total Movies: ${movies.length}</p>
        <p>Average Rating: ${averageRating}</p>
    `;
}

showAllMovies(); // Display all movies on page load
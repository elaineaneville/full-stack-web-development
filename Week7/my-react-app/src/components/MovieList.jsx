import MovieCard from './MovieCard';

function MovieList(){
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

    return (
        <section>
            <h2>Movies</h2>
            <div className="movie-list">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        title={movie.title} 
                        genre={movie.genre}
                        releaseYear={movie.year}
                    />
                ))}
            </div>
        </section>
    );
}
export default MovieList;
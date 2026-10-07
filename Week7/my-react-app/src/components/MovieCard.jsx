function MovieCard(props) {
    return (
        <article className="movie-card">
            <h2>{props.title}</h2>
            <p>Release Year: {props.releaseYear}</p>
            <p>Genre: {props.genre}</p>
        </article>
    );
}

export default MovieCard;
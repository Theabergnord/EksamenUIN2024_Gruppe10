import React from "react";

/*export default function MovieCard({ movies }) {
console.log(movies)

    return (
        <section className="movieCard">
        {movies.map((movie, index) => (
        <article key={index} className="movieInfo">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <img src={movie.posterURL} alt={`Poster ${movie.title}`} />

        </article>
        ))}
        </section>
    )
}*/

//target="_blank" rel="noopener noreferrer"
//Kilde target og rel: https://www.elegantthemes.com/blog/wordpress/rel-noopener-noreferrer-nofollow

export default function MovieCard() {
        return (
            <article className="movieCard">
                <img src="/placeholder.jpg" alt="placeholder" />
                <h4>Movie Title</h4>
            </article>
        )
    }
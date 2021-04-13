import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MovieList = ({ movies = [] }) => {
    return (
        <div className="row">
        { movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                    <MovieItem item={movie} showDelete={false}/>
                </div>
            )
        })}
    </div>

    )
};

MovieList.prototype = {
    movies: PropTypes.array.isRequired
};

export default MoviesHOC(MovieList);
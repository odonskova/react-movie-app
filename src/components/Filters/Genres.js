import React from "react";
import PropTypes from "prop-types"


const Genres = ({ genresList, with_genres, onChangeFilter }) => {
    return (
        genresList.map(option => {
            return (
                <div className="form-check" key={option.id}>
                    <input className="form-check-input"
                           type="checkbox"
                           name="with_genres"
                           value={option.id}
                           checked={with_genres.includes(String(option.id))}
                           onChange={(event) => onChangeFilter(event)}/>
                    <label className="form-check-label">
                        {option.name}
                    </label>
                </div>
            )
        })
    )
}

Genres.prototype = {
    genresList: PropTypes.array.isRequired,
    with_genres: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired
}

export default Genres;
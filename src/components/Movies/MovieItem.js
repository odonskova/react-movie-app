import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class MovieItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        showDelete: PropTypes.bool.isRequired,
    };

    render() {
        const { item, showDelete, removeFromFavorites} = this.props;
        const imageSrc = item.backdrop_path || item.poster_path;
        return (
            <div className="card">
                <img
                    className="card-img-top card-img--height"
                    src={imageSrc ? `https://image.tmdb.org/t/p/w500${imageSrc}` : ""}
                    alt=""
                />
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <Link to={`/movie/${item.id}/${item.original_title.replace(/[^A-Za-z]/g, "")}`} className="card-title">{item.title}</Link>
                        <div className="card-text">Рейтинг: {item.vote_average}</div>
                    </div>
                    {showDelete ?
                        <div>
                            <button type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => removeFromFavorites(item.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-trash" viewBox="0 0 20 20">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                Удалить
                            </button>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}
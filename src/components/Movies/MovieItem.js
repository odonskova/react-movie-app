import React from "react";
import { Link } from "react-router-dom";

export default class MovieItem extends React.Component {
    render() {
        const { item } = this.props;
        const imageSrc = item.backdrop_path || item.poster_path;
        return (
            <div className="card">
                <img
                className="card-img-top card-img--height"
                src={imageSrc ? `https://image.tmdb.org/t/p/w500${imageSrc}` : ""}
                alt=""
                />
                <div className="card-body">
                    <Link to={`/movie/${item.id}/${item.original_title.replace(/[^A-Za-z]/g, "")}`} className="card-title">{item.title}</Link>
                    <div className="card-text">Рейтинг: {item.vote_average}</div>
                </div>
            </div>
        )
    }

}
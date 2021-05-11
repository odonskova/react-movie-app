import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";
import { heartIcon, trashIcon } from "../../icons/icons";

class MovieItem extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        showDelete: PropTypes.bool.isRequired,
    };

    handleClick = () => {
        this.props.addToFavorites(this.props.item)
    };

    render() {
        const { item, showDelete, removeFromFavorites } = this.props;
        const imageSrc = item.backdrop_path || item.poster_path;
        return (
            <div className="card card-container">
                <div className='image-container d-flex justify-content-start'>
                    <img
                        className="card-img-top card-img--height"
                        src={imageSrc ? `https://image.tmdb.org/t/p/w500${imageSrc}` : ""}
                        alt=""
                    />

                    <div className={`${showDelete ? `d-none` : `cover d-flex align-items-center justify-content-center` }`}>
                        <button type="button"
                                className="add-button"
                                onClick={this.handleClick}
                        >Добавить в избранные
                            { heartIcon }
                        </button>

                    </div>

                </div>

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
                                { trashIcon }
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

export default AppContextHOC(MovieItem)
import React, {useState} from "react";
import {Tooltip} from "reactstrap";
import { starIcon, bookmarkIcon } from "../../icons/icons";

const Buttons = (props) => {
    const {
        addToFavorites,
        scrollToMoviePlayer,
        user
    } = props;
    const [rateTooltipOpen, setRateTooltipOpen] = useState(false);
    const [favoriteTooltipOpen, setFavoriteTooltipOpen] = useState(false);

    const toggleRate = () => {
        setRateTooltipOpen(!rateTooltipOpen)
    };

    const toggleFavorite= () => {
        setFavoriteTooltipOpen(!favoriteTooltipOpen)
    };

    return (
        <>
            <button type="button"
                    className="btn btn-outline-warning mr-3"
                    id="rateMovie"
            >
                { starIcon }
                Оценить фильм</button>
            {!user ?
                <Tooltip placement="bottom" isOpen={rateTooltipOpen} target="rateMovie" toggle={toggleRate}>
                    Войти для оценки фильма
                </Tooltip> : null
            }

            <button type="button"
                    className="btn btn-outline-warning mr-3"
                    id="addToFavorites"
                    onClick={addToFavorites}
            >
                { bookmarkIcon }
                Добавить в избранные</button>

            {!user ?
                <Tooltip placement="bottom" isOpen={favoriteTooltipOpen} target="addToFavorites" toggle={toggleFavorite}>
                    Войти для добавления в список избранных
                </Tooltip> : null
            }

            <button type="button"
                    className="btn btn-success"
                    onClick={scrollToMoviePlayer}
            >
                Посмотреть трейлер</button>
        </>

    )
};

export default Buttons
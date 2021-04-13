import React, {useState} from "react";
import {Tooltip} from "reactstrap";

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
            ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                     className="bi bi-star-fill mr-1 mb-1" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                Оценить фильм</button>
            {!user ?
                <Tooltip placement="bottom" isOpen={rateTooltipOpen} target="rateMovie" toggle={toggleRate}>
                    Войти для для оценки фильма
                </Tooltip> : null
            }


            <button type="button"
                    className="btn btn-outline-warning mr-3"
                    id="addToFavorites"
                    onClick={addToFavorites}
            ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  className="bi bi-bookmark-star-fill mr-1 mb-1" viewBox="0 0 16 16">
                <path
                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
            </svg>
                Добавить в избранные</button>

            {!user ?
                <Tooltip placement="bottom" isOpen={favoriteTooltipOpen} target="addToFavorites" toggle={toggleFavorite}>
                    Войти для добавления в свой список избранных
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
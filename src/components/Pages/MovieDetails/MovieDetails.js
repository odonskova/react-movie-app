import React from "react";
import MovieTrailer from "../MovieTrailer/MovieTrailer";
import {fetchAPI} from "../../../api/fetchApi";
import {API_URL, API_KEY3} from "../../../api/api";
import {Container, Media } from 'reactstrap';
import 'react-circular-progressbar/dist/styles.css';
import Rate from "../../Rate/Rate";
import Buttons from "../../Buttons/Buttons";

export default class MovieDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            movieDetails: [],
            trailerKey: [],
            vote_average: null,
            movieTrailerSection: React.createRef(),
        }
    }

    componentDidMount() {
        const link = `${API_URL}/movie/${this.props.match.params.id}?api_key=${API_KEY3}&language=ru-RU`;
        const movieKeyLink = `${API_URL}/movie/${this.props.match.params.id}/videos?api_key=${API_KEY3}&language=ru-RU`;

        fetchAPI(link)
            .then(data => this.setState({
                movieDetails: data,
                vote_average: data.vote_average
            }));
        fetchAPI(movieKeyLink)
            .then(data => {
                let key = data.results.map(item => item.key);
                this.setState({
                    trailerKey: key
                })})
    }

    getTimeFromMinutes(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return `${hours}ч ${minutes}мин`;
    };

    getPercentageColor = () => {
        if (this.state.vote_average < 4 ) {
            return '#e80707'
        } else if (this.state.vote_average < 6 ) {
            return '#edc01c'
        } else {
            return '#29b337'
        }
    };

    scrollToMoviePlayer = () => {
        this.state.movieTrailerSection.current.scrollIntoView({behavior: 'smooth'})
    };

    render() {
        const { movieDetails, vote_average, trailerKey, movieTrailerSection} = this.state;
        const imageSrc = movieDetails.poster_path;
        const backgroundImg = movieDetails.backdrop_path;
        const duration = this.getTimeFromMinutes(movieDetails.runtime);
        return (
            <>
                <div  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w500${backgroundImg})`,
                    height: "100vh",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"

                }}>
                    <Container>
                        <Media style={{color: "#ffffff"}}>
                            <Media left href="#">
                                <img className="mr-3 ml-3 mt-4"
                                     src={imageSrc ? `https://image.tmdb.org/t/p/w500${imageSrc}` : ""}
                                     alt=""/>
                            </Media>

                            <Media body className="ml-3 mt-5">
                                <div className="d-flex justify-content-around">
                                    <h3>{movieDetails.title}</h3>
                                    <Rate
                                        vote_average={vote_average}
                                        getPercentageColor={this.getPercentageColor}
                                    />
                                </div>

                                <Media heading className="mt-4">
                                    Обзор
                                </Media>
                                <p style={{ textAlign: "justify" }}>{movieDetails.overview}</p>

                                <Media heading  className="mt-4">
                                    Дата выпуска:
                                </Media>
                                <p>{movieDetails.release_date}</p>


                                <Media heading className="mt-4">
                                    Длительность фильма:
                                </Media>
                                <p>{duration}</p>
                                <Media className="d-flex">
                                    <Buttons
                                        buttonId="rateMovie"
                                        buttonSvg="star"
                                        buttonSvgPath="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                                        buttonText="Оценить фильм"
                                        tooltipText="Войти для для оценки этого фильма"
                                    />

                                    <Buttons
                                        buttonId="addToFavorites"
                                        buttonSvg="bookmark-star"
                                        buttonSvgPath="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                        buttonText="Добавить в избранные"
                                        tooltipText="Войти для добавления этого фильма в свой список избранных"
                                    />
                                    <Buttons
                                        scrollToMoviePlayer={this.scrollToMoviePlayer}
                                        buttonStyle="success"
                                        buttonText="Посмотреть трейлер"
                                    />
                                </Media>
                            </Media>
                        </Media>

                    </Container>
                </div>
                <MovieTrailer
                    ref={movieTrailerSection}
                    trailerKey={trailerKey}
                />
            </>
        )
    }
}
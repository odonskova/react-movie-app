import React from "react";
import MovieTrailer from "../MovieTrailer/MovieTrailer";
import { fetchAPI } from "../../../api/fetchApi";
import { API_URL, API_KEY3 } from "../../../api/api";
import { Container, Media } from 'reactstrap';
import 'react-circular-progressbar/dist/styles.css';
import Rate from "../../Rate/Rate";
import Buttons from "../../Buttons/Buttons";
import AppContextHOC from "../../HOC/AppContextHOC";

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
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

    handleOnClick = () => {
        this.props.addToFavorites(this.state.movieDetails);
    };
    render() {
        const { movieDetails, vote_average, trailerKey, movieTrailerSection} = this.state;
        const imageSrc = movieDetails.poster_path;
        const backgroundImg = movieDetails.backdrop_path;
        const duration = this.getTimeFromMinutes(movieDetails.runtime);
        return (
            <>
                <div style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
                    url(https://image.tmdb.org/t/p/w500${backgroundImg})`}}
                     className="movieDetailsBackground"
                >
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
                                    <Buttons scrollToMoviePlayer={this.scrollToMoviePlayer}
                                             addToFavorites={this.handleOnClick}
                                             user={this.props.user}
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

export default AppContextHOC(MovieDetails)
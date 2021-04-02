import React from "react";
import { API_KEY3 } from "../../api/api";
import Genres from "./Genres"

export default class GenresContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            genresList: [],
        }
    }
    componentDidMount() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY3}&language=ru-RU`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    genresList: data.genres
                })
            })
    }


    render() {
        const { with_genres, onChangeFilter} = this.props;
        return <Genres 
        genresList={this.state.genresList}
        with_genres={with_genres}
        onChangeFilter={onChangeFilter}
        />
    }
}
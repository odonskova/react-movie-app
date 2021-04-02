// import React from "react";
// import { API_URL, API_KEY3 } from "../../api/api";
// import MoviesList from "./MoviesList";
//
// export default class MoviesContainer extends React.Component {
//     constructor() {
//         super();
//
//         this.state = {
//             movies: [],
//         }
//     }
//
//     getMovies = (filters, page) => {
//         const { sort_by, primary_release_year, with_genres } = filters;
//         let link = `${API_URL}/discover/movie?api_key=${API_KEY3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres}`;
//         fetch(link)
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({
//                     movies: data.results
//                 });
//                 this.props.onChangeTotalPages(data.total_pages)
//             });
//     };
//
//     componentDidMount() {
//         this.getMovies(this.props.filters, this.props.page)
//     }
//
//     componentDidUpdate(prevProps) {
//         if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
//             this.getMovies(this.props.filters, 1);
//             this.props.onChangePage(1)
//         }
//
//         if (prevProps.page !== this.props.page) {
//             this.getMovies(this.props.filters, this.props.page)
//         }
//         if (prevProps.filters.primary_release_year !==
//             this.props.filters.primary_release_year) {
//             this.getMovies(this.props.filters, this.props.page)
//         }
//
//         if (prevProps.filters.with_genres !==
//             this.props.filters.with_genres) {
//             this.getMovies(this.props.filters, this.props.page)
//         }
//     }
//
//     render() {
//         const { movies } = this.state;
//         return <MoviesList movies={movies} />
//     }
// }
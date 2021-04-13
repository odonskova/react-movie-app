import React from "react";
import Filters from "../../Filters/Filters";
import MovieList from "../../Movies/MoviesList";

export default class MoviesPage extends React.Component {
    constructor() {
        super();
        this.state = {
            filters: {
                sort_by: "popularity.desc",
                primary_release_year: "2021",
                with_genres: []
            },
            page: 1,
            total_pages: null,
        }
    }

    onChangeFilter = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [name]: value
            },
        }));
    };

    onChangePage = number => () => {
        this.setState({
            page: this.state.page + number
        })
    };

    onChangeTotalPages = totalPages => {
        this.setState({
            total_pages: totalPages
        })
    };

    resetAllFilters = () => {
        this.setState({
            filters: {
                sort_by: "popularity.desc",
                primary_release_year: "2020",
                with_genres: []
            },
            page: 1,
        })
    };

    render() {
        const {filters, page, total_pages} = this.state;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{width: "100%"}}>
                            <div className="card-body">
                                <h3>Фильтры: </h3>
                                <Filters
                                    filters={filters}
                                    page={page}
                                    total_pages={total_pages}
                                    onChangeFilter={this.onChangeFilter}
                                    onChangePage={this.onChangePage}
                                    resetAllFilters={this.resetAllFilters}
                                    with_genres={this.state.filters.with_genres}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MovieList
                            filters={filters}
                            page={page}
                            onChangeTotalPages={this.onChangeTotalPages}
                            onChangePage={this.onChangePage}
                        />
                    </div>
                </div>
            </div>

        )
    }
};



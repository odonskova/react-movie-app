import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import GenresContainer from "./GenresContainer";

export default class Filters extends React.Component {
    render() {
        const { filters,
            onChangeFilter,
            page,
            onChangePage,
            total_pages,
            with_genres,
            resetAllFilters,
        } = this.props;

        return (
            <form className="mb-3">
                <SortBy
                    sort_by={filters.sort_by}
                    onChangeFilter={onChangeFilter}
                />
                <PrimaryReleaseYear
                    primary_release_year={filters.primary_release_year}
                    onChangeFilter={onChangeFilter}
                />
                <GenresContainer
                    with_genres={with_genres}
                    onChangeFilter={onChangeFilter}
                />
                <button type="button"
                        className="btn btn-outline-dark mt-3 ml-3"
                        onClick={resetAllFilters}
                >
                    Сбросить все вильтры
                </button>
                <Pagination
                    page={page}
                    total_pages={total_pages}
                    onChangePage={onChangePage}
                />
            </form>
        )
    }
};


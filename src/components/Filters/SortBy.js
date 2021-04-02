import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";

export default class SortBy extends React.Component {
    static propTypes = {
        onChangeFilter: PropTypes.func.isRequired,
        sort_by: PropTypes.string.isRequired
    };

    static defaultProps = {
        options : [
            {
                label: "Популятрные по убыванию",
                value: "popularity.desc"
            },
            {
                label: "Популярные по возростанию",
                value: "popularity.asc"
            },
            {
                label: "Рейтинг по убыванию",
                value: "vote_average.desc"
            },
            {
                label: "Рейтинг по возростанию",
                value: "vote_average.asc"
            }
        ]
    };

    render() {
        const { sort_by, onChangeFilter, options } = this.props;
        return (
            <UISelect
                id="sort_by"
                name="sort_by"
                value={sort_by}
                onChange={onChangeFilter}
                labelText="Сортивровать по: "
            >
                { options.map(option => {
                    return <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                })}
            </UISelect>
        )
    }
}
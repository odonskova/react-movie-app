import React from "react";
import UISelect from "../UIComponents/UISelect"

export default class PrimaryReleaseYear extends React.PureComponent {
    static defaultProps = {
        options : [
            {
                label: "2021",
                value: "2021"
            },
            {
                label: "2020",
                value: "2020"
            },
            {
                label: "2019",
                value: "2019"
            },
            {
                label: "2018",
                value: "2018"
            },
            {
                label: "2017",
                value: "2017"
            },
            {
                label: "2016",
                value: "2016"
            },
            {
                label: "2015",
                value: "2015"
            }
        ]
    };

    // замена PureComponent
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.value !== this.props.value;
    // }

    render() {
        const { primary_release_year, onChangeFilter, options } = this.props;
        return (
            <UISelect
                id="primary_release_year"
                name="primary_release_year"
                value={primary_release_year}
                onChange={onChangeFilter}
                labelText="Год релиза:"
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

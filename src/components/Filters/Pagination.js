import React from "react";

export default class Pagination extends React.PureComponent {
    render() {
        const { page, onChangePage, total_pages } = this.props;
        return (
            <div className="align-items-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? 'disabled' : null}`}>
                        <button type="button"
                                className="page-link"
                                onClick={onChangePage(-1)}
                        >
                            Назад
                        </button>
                    </li>
                    <li className="w-50 ml-3 mr-3 mt-2">{page} of {total_pages}</li>
                    <li className="page-item">
                        <button type="button"
                                className="page-link"
                                onClick={onChangePage(1)}
                        >
                            Вперед
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}
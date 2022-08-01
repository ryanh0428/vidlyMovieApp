import _ from 'lodash';
import PropTypes from 'prop-types';
function Pagination({ onPagination, length, currentPage, pageSize }) {
    const pagesCount = Math.ceil(length / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page =>
                (<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                    <a className="page-link" onClick={() => onPagination(page)}>{page}</a>
                </li>)
                )

                }

            </ul>
        </nav >
    );
}

Pagination.propTypes = {
    onPagination: PropTypes.func.isRequired, length: PropTypes.number.isRequired, currentPage: PropTypes.number.isRequired, pageSize: PropTypes.number.isRequired
}

export default Pagination;
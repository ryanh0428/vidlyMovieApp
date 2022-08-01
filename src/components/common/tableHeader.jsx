function TableHeader({ onSort, columns, sortColumn }) {

    const raiseSort = (path) => {

        if (sortColumn.path === path)
            sortColumn = sortColumn.order === 'asc' ? { path, order: 'desc' } : { path, order: 'asc' };
        else
            sortColumn = { path, order: 'asc' };

        // if (sortColumn.path === path)
        //     setSortColumn(sortColumn.order === 'asc' ? { path, order: 'desc' } : { path, order: 'asc' })
        // else
        //     setSortColumn({ path, order: 'asc' })//original form is path:path

        onSort(sortColumn);
    }

    const renderSortIcon = column => {
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return (<i className="fa-solid fa-sort-down"></i>)
        return (<i className="fa-solid fa-sort-up"></i>);
    }
    return (
        <thead>
            <tr>
                {columns.map(column =>
                    <th className="clickable" key={column.path || column.key} onClick={() => raiseSort(column.path)}>
                        {column.label} {renderSortIcon(column)}
                    </th>)}
            </tr>
        </thead>
    );
}
{/* <i class="fa-solid fa-sort-down"></i> */ }
{/* <i class="fa-solid fa-sort-up"></i> */ }

export default TableHeader;
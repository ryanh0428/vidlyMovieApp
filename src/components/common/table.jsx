import TableHeader from "./tableHeader"
import TableBody from "../tableBody"
function Table({ columns, onSort, sortColumn, data }) {
    return (
        <table className="table">
            <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

export default Table;
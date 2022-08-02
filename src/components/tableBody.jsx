import _ from 'lodash';
import Movies from './movies';
import { Link } from "react-router-dom"
function TableBody({ data, columns }) {
    const renderCell = (item, column) => {
        if (column.content) return column.content(item);

        return _.get(item, column.path)
    }

    const createKey = (item, column) => {
        return item._id + (column.path || column.key)
    }

    return (
        <tbody>
            {data.map(item =>
                <tr key={item._id}>
                    {columns.map(column =>
                        <td key={createKey(item, column)}>{renderCell(item, column)}</td>)}
                </tr>)}
        </tbody>);
}

export default TableBody;
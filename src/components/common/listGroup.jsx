const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {
    return (
        <ul className="list-group">
            {items.map(item =>

                <li key={item[valueProperty]} onClick={() => { onItemSelect(item) }} className={item[textProperty] === selectedItem[textProperty] ? "list-group-item active clickable" : "list-group-item clickable"}>{item[textProperty]}</li>)}

        </ul>
    );
}

ListGroup.defaultProps = {//provide an interface to work with different datasource with different Name
    textProperty: 'name',
    valueProperty: '_id',
}

export default ListGroup;
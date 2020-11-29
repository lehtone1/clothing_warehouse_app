import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends React.Component {
  constructor(props) {
    const { items } = props;
    super();
    this.state = {
      items,
    };
  }

  render() {
    const { items } = this.state;
    return (
      <div className="Table-container">
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Price</th>
              <th>Color</th>
              <th>Manufacturer</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody className="Table-body">
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.color}</td>
                <td>{item.manufacturer}</td>
                <td>{item.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;

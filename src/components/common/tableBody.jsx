import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns, idProperty } = this.props;
    return (
      <React.Fragment>
        <tbody>
          {data.map(item => (
            <tr key={item[idProperty]}>
              {columns.map(column => (
                <td key={`${item[idProperty]}${column.path || column.key}`}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}
TableBody.defaultProps = {
  idProperty: "_id"
};
export default TableBody;

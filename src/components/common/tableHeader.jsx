import React, { Component } from "react";
/**
 * Interface:
 * columns array : each column include {path,label,type}
 * sortColumn
 * onSort
 */
class TableHeader extends Component {
  handleSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  getHeaderClasses = column => {
    const { sortColumn } = this.props;
    if (column.path) {
      let classes = `btn btn-link fas fa-sort-${column.type}-`;
      if (column.path === sortColumn.path)
        return (classes += sortColumn.order === "asc" ? "down" : "up");

      return (classes += "up text-muted");
    }
    return `btn btn-link`;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.path || column.key}>
              {column.label}
              <button
                onClick={() => this.handleSort(column.path)}
                className={this.getHeaderClasses(column)}
              ></button>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

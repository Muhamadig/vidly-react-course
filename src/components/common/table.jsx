import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = props => {
  const { columns, onSort, sortColumn, data, itemPath } = props;
  return (
    <table className="table table-hover table-sm">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} itemPath={itemPath} />
    </table>
  );
};

export default Table;

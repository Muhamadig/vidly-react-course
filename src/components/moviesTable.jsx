import React, { Component } from "react";
import Like from "./common/like.jsx";
class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", type: "alpha" },
    { path: "genre.name", label: "Genre", type: "alpha" },
    { path: "numberInStock", label: "Stock", type: "numeric" },
    { path: "dailyRentalRate", label: "Rate", type: "numeric" }
  ];

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
  getHeaderClasses = (path, type) => {
    const { sortColumn } = this.props;
    let classes = `btn btn-link fas fa-sort-${type}-`;
    if (path === sortColumn.path)
      return (classes += sortColumn.order === "asc" ? "down-alt" : "up");

    return (classes += "up");
  };
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th>
              Title
              <button
                onClick={() => this.handleSort("title")}
                className={this.getHeaderClasses("title", "alpha")}
                style={{ color: "#339af0" }}
              ></button>
            </th>
            <th>
              Genre
              <button
                onClick={() => this.handleSort("genre.name")}
                className={this.getHeaderClasses("genre.name", "alpha")}
                style={{ color: "#339af0" }}
              ></button>
            </th>
            <th>
              Stock
              <button
                onClick={() => this.handleSort("numberInStock")}
                className={this.getHeaderClasses("numberInStock", "numeric")}
                style={{ color: "#339af0" }}
              ></button>
            </th>
            <th>
              Rate
              <button
                onClick={() => this.handleSort("dailyRentalRate")}
                className={this.getHeaderClasses("dailyRentalRate", "numeric")}
                style={{ color: "#339af0" }}
              ></button>
            </th>
            <th>Like</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like onLike={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;

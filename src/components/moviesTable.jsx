import React, { Component } from "react";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService.js";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      type: "alpha",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre", type: "alpha" },
    { path: "numberInStock", label: "Stock", type: "numeric" },
    { path: "dailyRentalRate", label: "Rate", type: "numeric" },
    {
      key: "like",
      content: movie => (
        <Like onLike={() => this.props.onLike(movie)} liked={movie.liked} />
      )
    },
    getCurrentUser() && getCurrentUser().isAdmin
      ? {
          key: "delete",
          content: movie => (
            <button
              onClick={() => this.props.onDelete(movie)}
              className="btn btn-danger btn-small"
            >
              Delete
            </button>
          )
        }
      : {}
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
        itemPath="/movies/:id"
      />
    );
  }
}
export default MoviesTable;

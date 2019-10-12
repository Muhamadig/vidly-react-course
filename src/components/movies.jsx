import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginition from "./common/pagination";
import { paginate } from "../utils/paginate.js";
import ButtonGroup from "./common/buttonGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres: genres
    });
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    let { currentPage } = this.state;
    if (movies.length === this.state.pageSize * (currentPage - 1))
      currentPage = currentPage - 1;
    this.setState({ movies, currentPage });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { movies: allMovies, selectedGenre, sortColumn } = this.state;
    if (moviesCount === 0) return <p>There Are No Movies To Show.</p>;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;
    console.log(sortColumn);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    console.log(sorted);
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="table-responsive container row">
        <div className="row">
          <div className="col col-2">
            <ButtonGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="row">
              <div className="col col-6">
                <span style={{ color: "#6c757d", textAlign: "start" }}>
                  Showing {movies.length} Movies of {filteredMovies.length}.
                </span>
              </div>
              <div className="col ">
                <Paginition
                  itemsCount={filteredMovies.length}
                  pageSize={this.state.pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={this.state.currentPage}
                />
              </div>
            </div>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
          </div>
        </div>
      </div>
    );
  }
}

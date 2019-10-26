import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginition from "./common/pagination";
import { paginate } from "../utils/paginate.js";
import ButtonGroup from "./common/buttonGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    selectedGenre: null,
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleNewMovie = () => {
    this.props.history.push("/new");
  };
  render() {
    const { length: moviesCount } = this.state.movies;
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;
    if (moviesCount === 0) return <p>There Are No Movies To Show.</p>;

    const filteredMovies = searchQuery
      ? allMovies.filter(movie =>
          movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : selectedGenre && selectedGenre._id
      ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <React.Fragment>
        <div className="row mb-5">
          <div className="col">
            <h1 className="">Movies</h1>
          </div>
        </div>
        <div className=" row ">
          <div className="col col-sm-2">
            <Link className="btn btn-primary mb-2" to="/movies/new">
              New Movie
            </Link>

            <ButtonGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="row search">
              <div className="col ">
                <SearchBox
                  value={searchQuery}
                  onChange={this.handleSearch}
                  placeholder="Search Movie By Title..."
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-6">
                <span
                  style={{
                    color: "#6c757d",
                    textAlign: "start"
                  }}
                >
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
      </React.Fragment>
    );
  }
}

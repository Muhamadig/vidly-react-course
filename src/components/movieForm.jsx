import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieForm extends Form {
  state = {
    data: {
      id: "",
      title: "",
      genreId: "5b21ca3eeb7f6fbccd471818",
      numberInStock: 0,
      dailyRentalRate: 0
    },
    errors: {}
  };
  schema = {
    id: [Joi.any()],
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };
  componentDidMount() {
    const { path, params } = this.props.match;
    if (path === "/movies/:id") {
      const movie = getMovie(params.id);
      this.setState({
        data: {
          id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate
        }
      });
    }
  }

  handleSave = () => {
    this.props.history.replace("/movies");
  };
  handleCancel = () => {
    this.props.history.push("/movies");
  };

  handleTitle = () => {
    const movie = { ...this.state.data };
    return movie.id ? `Edit ${movie.title} Movie` : "Add New Movie";
  };
  doSubmit = () => {
    this.props.history.push("/movies");
  };
  getGenres = () => {
    const genres = getGenres();
    let result = [];
    genres.forEach(g => result.push({ value: g._id, label: g.name }));

    return result;
  };
  render() {
    return (
      <div>
        <h1>{this.handleTitle()}</h1>
        <form className="form-movie" onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "text", "title", true)}
          {this.renderSelectMenu(
            "Genre",
            "genreId",
            this.getGenres(),
            this.state.data.genreId
          )}
          {this.renderInput("Stock", "number", "numberInStock")}
          {this.renderInput("Rate", "number", "dailyRentalRate")}
          {this.renderSubmitForm("Save")}
          <button
            onClick={this.handleCancel}
            className="btn btn-secondary ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;

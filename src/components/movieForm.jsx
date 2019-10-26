import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
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
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    console.log(movieId);
    if (!movieId) return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.push("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  handleTitle = () => {
    const movie = { ...this.state.data };
    return movie._id ? `Edit "${movie.title}" Movie` : "Add New Movie";
  };

  render() {
    return (
      <div>
        <h1>{this.handleTitle()}</h1>
        <form className="form-movie" onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "text", "title", true)}
          {this.renderSelectMenu("Genre", "genreId", this.state.genres)}
          {this.renderInput("Stock", "number", "numberInStock")}
          {this.renderInput("Rate", "number", "dailyRentalRate")}
          {this.renderSubmitForm("Save")}
          {this.renderCancelForm("Cancel", "/movies")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

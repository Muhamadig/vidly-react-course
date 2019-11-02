import restService from "./restService.js";
import config from "../config.json";
export function getMovies() {
  return restService.get(`${config.apiBaseURL}/api/movies`);
}

export function getMovie(id) {
  return restService.get(`${config.apiBaseURL}/api/movies/${id}`);
}

export function saveMovie(movie) {
  if (!movie._id) {
    return restService.post(`${config.apiBaseURL}/api/movies/`, movie);
  }
  const body = { ...movie };
  delete body._id;
  return restService.put(`${config.apiBaseURL}/api/movies/${movie._id}`, body);
}

export function deleteMovie(movieId) {
  return restService.delete(`${config.apiBaseURL}/api/movies/${movieId}`);
}

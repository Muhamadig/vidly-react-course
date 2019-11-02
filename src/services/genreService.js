import restService from "./restService.js";
import config from "../config.json";
export function getGenres() {
  return restService.get(`${config.apiBaseURL}/api/genres`);
}

export function getGenre(id) {
  return restService.get(`${config.apiBaseURL}/api/genres/${id}`);
}

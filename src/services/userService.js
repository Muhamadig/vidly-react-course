import restService from "./restService.js";
import { apiBaseURL } from "../config.json";

const api = `${apiBaseURL}/api/users`;
export function register(user) {
  return restService.post(api, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

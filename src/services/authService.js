import restService from "./restService.js";
import { apiBaseURL } from "../config.json";
import jwtDecode from "jwt-decode";

const token = "token";

export async function login(user) {
  const { data: jwt } = await restService.post(`${apiBaseURL}/api/auth`, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(token, jwt);
}
export async function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(token);
}

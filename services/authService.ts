import axios, { AxiosResponse } from "axios";

let API_URL = "";

export const authService = {
  setApiUrl,
  register,
  login,
  update,
  deleteUser,
  checkToken,
  getDancersList
};

function setApiUrl(url: string) {
  API_URL = url;
}

function register(
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/register`, { username, email, password });
}

function login(email: string, password: string): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/login`, { email, password });
}

function update(email: string, username: string, token: string): Promise<AxiosResponse> {
  if (!token) { return Promise.reject("No token found"); }
  return axios.put(`${API_URL}/user`, { email, username }, { headers: { Authorization: `Bearer ${token}`, } });
}

function deleteUser(email: string, token: string): Promise<AxiosResponse> {
  if (!token) { return Promise.reject("No token found"); }
  return axios.delete(`${API_URL}/user`, { params: { email }, headers: { Authorization: `Bearer ${token}`, }, });
}

function getDancersList(email: string, token: string): Promise<AxiosResponse> {
  if (!token) { return Promise.reject("No token found"); }
  return axios.get(`${API_URL}/dancers`, { params: { email }, headers: { Authorization: `Bearer ${token}`, }, });
}

function checkToken(email: string, token: string): Promise<AxiosResponse> {
  if (!token) { return Promise.reject("No token found"); }
  return axios.get(`${API_URL}/user`, { params: { email }, headers: { Authorization: `Bearer ${token}`, }, });
}

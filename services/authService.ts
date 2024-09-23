import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5000/api"; // API URL for development

interface LoginResponse {
  token: string;
  user: any;
}

interface UpdateResponse {
  user: any;
}

export const authService = {
  register,
  login,
  update,
  logout,
  deleteUser,
};

function register(
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/register`, { username, email, password });
}

function login(email: string, password: string): Promise<LoginResponse> {
  return axios
    .post<LoginResponse>(`${API_URL}/login`, { email, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      const { token, user } = response.data;
      localStorage.setItem("current_user_token", token);
      localStorage.setItem("current_user", JSON.stringify(user));
      return response.data;
    });
}

function update(email: string, username: string, token: string): Promise<UpdateResponse> {
  if (!token) {
    return Promise.reject("No token found");
  }
  console.log('ici3', email, username, token);
  return axios.put(`${API_URL}/user`, {
    params: { email, username },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function logout(): void {
  localStorage.removeItem("current_user_token");
  localStorage.removeItem("current_user");
}

function deleteUser(email: string, token: string): Promise<AxiosResponse> {
  if (!token) {
    return Promise.reject("No token found");
  }

  return axios.delete(`${API_URL}/user`, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

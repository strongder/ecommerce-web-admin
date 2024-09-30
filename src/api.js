import axios from "axios";
import {jwtDecode} from 'jwt-decode'; // Corrected import

const checkExpiredToken = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    // Redirect if no refresh token
    window.location.href = "/login";
    return null;
  }

  if (checkExpiredToken(refreshToken)) {
    // Clear token and redirect if refresh token is expired
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return null;
  }

  try {
    // Refresh the token
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/refresh-token",
      { refreshToken }
    );

    // Store new tokens
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    // Return new token data
    return response.data;
  } catch (error) {
    console.error("Refresh token failed:", error.message);
    window.location.href = "/login";
    return null;
  }
};

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to inject token into each request
instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      // Check if the token is expired
      if (checkExpiredToken(token)) {
        const response = await refreshToken();
        if (response) {
          token = response.token;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(new Error("Token refresh failed"));
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.location.href = "/login";
      return Promise.reject(new Error("No token available"));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://clickncart-v2.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add response interceptor for better error handling
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;

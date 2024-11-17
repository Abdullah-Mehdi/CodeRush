import axios from 'axios';

// Create an Axios instance with a base URL for API requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL for your backend API
  timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

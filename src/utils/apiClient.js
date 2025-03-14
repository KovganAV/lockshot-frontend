import axios from "axios";

const baseURLs = {
  main: "https://localhost:7044",
  swagger1: "http://localhost:5000",
  swagger2: "https://localhost:7044", 
  swagger3: "http://localhost:5028"
};

const apiClient = axios.create({
  baseURL: baseURLs.main,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true 
});

apiClient.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization';
  return config;
});

export default apiClient;

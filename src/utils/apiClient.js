import axios from "axios";

const baseURL = "https://localhost:7044";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

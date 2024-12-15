import axios from "axios";

const makeRequest = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true, // Include credentials (like cookies) with cross-origin requests
});
export default makeRequest;


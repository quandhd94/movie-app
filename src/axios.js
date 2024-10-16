// src/axios.js
import axios from "axios";

// Tạo một instance của axios với cấu hình base URL
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // API base URL
});

export default instance;

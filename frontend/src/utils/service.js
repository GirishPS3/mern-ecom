import axios from "axios";

// Default config options
const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
// instance.interceptors.request.use(function (config) {
//   if (
//     localStorage.getItem("session") &&
//     JSON.parse(localStorage.getItem("session"))
//   ) {
//     let token = JSON.parse(localStorage.getItem("session")).token;
//     config.headers.Authorization = token ? `${token}` : "";
//   }
//   return config;
// });

export default instance;

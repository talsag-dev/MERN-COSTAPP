import axios from "axios";


// Create an instance of axios
const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      return Promise.reject(err);
    }
    
  }
);

export default api;

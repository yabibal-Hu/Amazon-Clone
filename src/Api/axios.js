import axios from "axios";

const axiosInstance = axios.create({
  // local host 
  // baseURL: "http://127.0.0.1:5001/clone-bf3c1/us-central1/api",

  // cloud render.com
  baseURL: "https://amazon-api-dkbq.onrender.com/",
});

export {axiosInstance}
// src/api/service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL:
    process.env.REACT_APP_API_URL || "https://giddy-coveralls-bat.cyclic.app",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const storedToken = localStorage.getItem("authToken");

const errorHandler = (err) => {
  throw err;
};

const getProducts = () => {
  return api
    .get("/products", { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api
    .post("/upload", file, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const createProduct = (newProduct) => {
  return api
    .post("/products", newProduct, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const service = { getProducts, uploadImage, createProduct };

export default service;

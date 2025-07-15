// src/api/axios.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/"; // Ajusta esta URL a la de tu API de Django REST

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: Interceptor para añadir el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Asume que guardas el token aquí
    if (token) {
      config.headers.Authorization = `Token ${token}`; // O 'Bearer' si usas JWT
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: Interceptor para manejar errores de respuesta (ej. 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirigir al login o limpiar el token
      console.error("No autorizado. Redirigiendo al login.");
      localStorage.removeItem("authToken");
      // router.push('/login'); // Si tienes Vue Router configurado
    }
    return Promise.reject(error);
  }
);

export default api;

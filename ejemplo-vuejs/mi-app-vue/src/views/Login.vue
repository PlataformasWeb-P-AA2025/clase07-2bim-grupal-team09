<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from "@/api/axios"; // Importa la instancia de Axios configurada
import router from "@/router"; // Importa el router de Vue

export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        this.error = null; // Limpiar errores anteriores
        // Petición POST al endpoint de login de Django REST Framework (DRF)
        // Asegúrate de que tienes un endpoint para obtener el token,
        // por ejemplo, usando rest_framework.authtoken.views.obtain_auth_token
        const response = await api.post(
          "http://localhost:8000/api-token-auth/",
          {
            // Ajusta este endpoint si es diferente
            username: this.username,
            password: this.password,
          }
        );

        const token = response.data.token;
        localStorage.setItem("authToken", token); // Guarda el token en localStorage

        console.log("Inicio de sesión exitoso. Token:", token);
        // Redirigir a la lista de estudiantes o a una página principal
        router.push("/estudiantes"); // Asume que tienes una ruta /estudiantes
      } catch (err) {
        console.error("Error al iniciar sesión:", err.response || err);
        if (err.response && err.response.status === 400) {
          this.error = "Credenciales inválidas. Por favor, inténtalo de nuevo.";
        } else {
          this.error = "Ocurrió un error. Por favor, inténtalo más tarde.";
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 20px); /* Ajusta para padding */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
}
</style>

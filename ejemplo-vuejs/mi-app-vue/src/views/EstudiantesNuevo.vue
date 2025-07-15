<template>
  <div class="nuevo-estudiante">
    <h1>Registrar Nuevo Estudiante</h1>
    <form @submit.prevent="crearEstudiante">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="estudiante.nombre" required />

      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" v-model="estudiante.apellido" required />

      <label for="cedula">Cédula:</label>
      <input type="text" id="cedula" v-model="estudiante.cedula" required />

      <label for="correo">Correo electrónico:</label>
      <input type="email" id="correo" v-model="estudiante.correo" required />

      <button type="submit">Guardar</button>
    </form>

    <p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
    <p v-if="error" class="mensaje-error">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudiantesNuevo",
  data() {
    return {
      estudiante: {
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
      },
      mensajeExito: null,
      error: null,
    };
  },
  methods: {
    async crearEstudiante() {
      try {
        this.mensajeExito = null;
        this.error = null;

        await api.post("estudiantes/", this.estudiante);
        this.mensajeExito = "Estudiante registrado correctamente.";
        this.$router.push("/estudiantes");
      } catch (err) {
        console.error("Error al crear estudiante:", err.response || err);
        if (err.response?.data?.cedula?.[0]) {
          this.error = `Cédula: ${err.response.data.cedula[0]}`;
        } else {
          this.error =
            "Error al registrar estudiante. Verifica los datos o tu sesión.";
        }
      }
    },
  },
};
</script>

<style scoped>
.nuevo-estudiante {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.mensaje-exito {
  color: green;
  margin-top: 10px;
}

.mensaje-error {
  color: red;
  margin-top: 10px;
}
</style>

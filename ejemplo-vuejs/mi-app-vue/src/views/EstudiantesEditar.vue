<template>
  <div class="editar-estudiante">
    <h1>Editar Estudiante</h1>
    <form @submit.prevent="actualizarEstudiante">
      <label for="nombre">Nombre:</label>
      <input id="nombre" v-model="estudiante.nombre" required />

      <label for="apellido">Apellido:</label>
      <input id="apellido" v-model="estudiante.apellido" required />

      <label for="cedula">Cédula:</label>
      <input id="cedula" v-model="estudiante.cedula" required />

      <label for="correo">Correo:</label>
      <input id="correo" type="email" v-model="estudiante.correo" required />

      <button type="submit">Actualizar</button>
    </form>

    <p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
    <p v-if="error" class="mensaje-error">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudiantesEditar",
  props: ["estudianteUrl"],
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
  async created() {
    try {
      const response = await api.get(this.estudianteUrl);
      this.estudiante = response.data;
    } catch (err) {
      this.error = "Error al cargar los datos del estudiante.";
    }
  },
  methods: {
    async actualizarEstudiante() {
      try {
        this.error = null;
        await api.put(this.estudianteUrl, this.estudiante);
        this.mensajeExito = "Estudiante actualizado correctamente.";
        this.$router.push("/estudiantes");
      } catch (err) {
        this.error = "Error al actualizar el estudiante.";
        console.error(err.response || err);
      }
    },
  },
};
</script>

<style scoped>
.editar-estudiante {
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
  background-color: #17a2b8;
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

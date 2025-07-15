<template>
  <div class="telefono-form-container">
    <h2>Agregar Número Telefónico</h2>

    <form @submit.prevent="guardarTelefono">
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input v-model="telefono.telefono" type="text" id="telefono" required />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select v-model="telefono.tipo" required>
          <option value="celular">Celular</option>
          <option value="fijo">Fijo</option>
          <option value="trabajo">Trabajo</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Guardar</button>
      <router-link
        :to="{ name: 'EstudianteDetail', params: { estudianteUrl } }"
        class="cancel-button"
      >
        Cancelar
      </router-link>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "TelefonoAgregar",
  props: ["estudianteUrl"],
  data() {
    return {
      telefono: {
        telefono: "",
        tipo: "",
        estudiante: decodeURIComponent(this.estudianteUrl),
      },
      error: null,
    };
  },
  methods: {
    async guardarTelefono() {
      try {
        this.error = null;
        await api.post("numerosts/", this.telefono);
        this.$router.push({
          name: "EstudianteDetail",
          params: { estudianteUrl: this.estudianteUrl },
        });
      } catch (err) {
        console.error("Error al guardar teléfono:", err);
        this.error = "No se pudo guardar el número telefónico.";
      }
    },
  },
};
</script>

<style scoped>
.telefono-form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-button,
.cancel-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.submit-button {
  background-color: #28a745;
  margin-right: 10px;
}

.cancel-button {
  background-color: #dc3545;
}

.submit-button:hover {
  background-color: #218838;
}

.cancel-button:hover {
  background-color: #c82333;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>

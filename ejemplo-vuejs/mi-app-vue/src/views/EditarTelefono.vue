<template>
  <div class="form-container">
    <h2>Editar Teléfono</h2>
    <form @submit.prevent="guardarCambios">
      <label for="telefono">Número:</label>
      <input v-model="telefono.telefono" required />

      <label for="tipo">Tipo:</label>
      <select v-model="telefono.tipo" required>
        <option value="celular">Celular</option>
        <option value="fijo">Fijo</option>
        <option value="trabajo">Trabajo</option>
      </select>

      <div class="button-group">
        <button type="submit">Guardar</button>
        <button type="button" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EditarTelefono",
  props: ["telefonoUrl"],
  data() {
    return {
      telefono: {
        telefono: "",
        tipo: "",
      },
    };
  },
  async created() {
    try {
      const response = await api.get(this.telefonoUrl);
      this.telefono = response.data;
    } catch (error) {
      console.error("Error al cargar teléfono:", error);
      alert("No se pudo cargar el número telefónico.");
    }
  },
  methods: {
    async guardarCambios() {
      try {
        await api.put(this.telefonoUrl, this.telefono);
        alert("Número actualizado correctamente.");
        this.$router.go(-1); // volver atrás
      } catch (error) {
        console.error("Error al guardar cambios:", error);
        alert("No se pudo actualizar el número.");
      }
    },
    cancelar() {
      this.$router.go(-1); // regresar a la vista anterior
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
}

input,
select {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

button[type="submit"] {
  background-color: #28a745;
}

button[type="submit"]:hover {
  background-color: #218838;
}

button[type="button"] {
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
}
</style>

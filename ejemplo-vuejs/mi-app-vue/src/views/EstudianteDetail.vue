<template>
  <div class="estudiante-detail-container">
    <h2>Detalle del Estudiante</h2>
    <p v-if="loading">Cargando detalles...</p>
    <p v-if="error" class="error-message">{{ error }}</p>

    <div v-else-if="estudiante">
      <h3>{{ estudiante.nombre }} {{ estudiante.apellido }}</h3>
      <p><strong>Cédula:</strong> {{ estudiante.cedula }}</p>
      <p><strong>Correo:</strong> {{ estudiante.correo }}</p>

      <h4>Números Telefónicos:</h4>
      <ul v-if="numerosTelefonicos.length">
        <li v-for="numero in numerosTelefonicos" :key="numero.url">
          {{ numero.telefono }} ({{ numero.tipo }})

          <router-link
            :to="{
              name: 'EditarTelefono',
              params: { telefonoUrl: encodeURIComponent(numero.url) },
            }"
            class="edit-button"
          >
            Editar
          </router-link>

          <button @click="eliminarTelefono(numero.url)" class="delete-button">
            Eliminar
          </button>
        </li>
      </ul>
      <p v-else>No tiene números telefónicos registrados.</p>

      <!-- Botón para agregar nuevo número -->
      <router-link
        :to="{
          name: 'AgregarTelefono',
          params: { estudianteUrl: encodeURIComponent(estudiante.url) },
        }"
        class="add-phone-button"
      >
        Agregar Número Telefónico
      </router-link>

      <router-link :to="{ name: 'EstudiantesList' }" class="back-button">
        Volver al Listado
      </router-link>
    </div>

    <p v-else>Estudiante no encontrado.</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudianteDetail",
  props: ["estudianteUrl"],
  data() {
    return {
      estudiante: null,
      numerosTelefonicos: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const decodedUrl = decodeURIComponent(this.estudianteUrl);
    await this.fetchEstudianteDetail(decodedUrl);
    await this.fetchNumerosTelefonicos(decodedUrl);
  },
  methods: {
    async fetchEstudianteDetail(url) {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.get(url);
        this.estudiante = response.data;
      } catch (err) {
        console.error("Error al cargar detalle del estudiante:", err);
        this.error = "No se pudo cargar el detalle del estudiante.";
      } finally {
        this.loading = false;
      }
    },
    async fetchNumerosTelefonicos(estudianteApiUrl) {
      try {
        const response = await api.get("numerosts/");
        this.numerosTelefonicos = response.data.results.filter(
          (numero) => numero.estudiante === estudianteApiUrl
        );
      } catch (err) {
        console.error("Error al cargar números telefónicos:", err);
      }
    },
    async eliminarTelefono(url) {
      if (confirm("¿Eliminar este número telefónico?")) {
        try {
          await api.delete(url);
          this.numerosTelefonicos = this.numerosTelefonicos.filter(
            (n) => n.url !== url
          );
        } catch (error) {
          console.error("Error al eliminar teléfono:", error);
          alert("No se pudo eliminar el número.");
        }
      }
    },
  },
};
</script>

<style scoped>
.estudiante-detail-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}

h2,
h3,
h4 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

p {
  margin-bottom: 10px;
}

ul {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

li {
  margin-bottom: 5px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.back-button,
.add-phone-button {
  display: block;
  width: fit-content;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}

.add-phone-button {
  background-color: #28a745;
}

.add-phone-button:hover {
  background-color: #218838;
}

.edit-button,
.delete-button {
  margin-left: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
}

.edit-button {
  background-color: #007bff;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>

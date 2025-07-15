import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue"; // Tu nuevo componente de login
import EstudiantesList from "../views/EstudiantesList.vue"; // Tu nuevo componente de lista de estudiantes
import EstudianteDetail from "../views/EstudianteDetail.vue"; // ¡Importa el nuevo componente!
import EstudianteNuevo from "../views/EstudiantesNuevo.vue"; // Componente para crear un nuevo estudiante

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/estudiantes",
    name: "EstudiantesList",
    component: EstudiantesList,
    meta: { requiresAuth: true }, // Marca esta ruta como protegida
  },
  {
    path: "/estudiantes/detail/:estudianteUrl*", // <-- ¡Cambio clave aquí!
    name: "EstudianteDetail",
    component: EstudianteDetail,
    props: true, // Esto pasa el ':id' como una prop al componente EstudianteDetail
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/nuevo",
    name: "EstudianteNuevo",
    component: EstudianteNuevo,
    meta: { requiresAuth: true }, // Marca esta ruta como protegida
  },
  {
    path: "/estudiantes/editar/:estudianteUrl*", // usa * para capturar toda la URL
    name: "EstudianteEditar",
    component: () => import("@/views/EstudiantesEditar.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/telefonos/editar/:telefonoUrl",
    name: "EditarTelefono",
    component: () => import("@/views/EditarTelefono.vue"),
    props: (route) => ({
      telefonoUrl: decodeURIComponent(route.params.telefonoUrl),
    }),
  },
  {
    path: "/telefonos/agregar/:estudianteUrl*",
    name: "AgregarTelefono",
    component: () => import("@/views/TelefonoAgregar.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guarda de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("authToken")) {
    next("/login"); // Redirige al login si no está autenticado
  } else {
    next();
  }
});

export default router;

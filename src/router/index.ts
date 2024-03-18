import { createRouter, createWebHistory } from "vue-router"

import { publicRoutes } from "./public"
import { privateRoutes } from "./private"
import { errorRoute } from "./error"

const routes = [...publicRoutes, ...privateRoutes, ...errorRoute]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

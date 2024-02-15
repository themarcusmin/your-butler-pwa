import { createRouter, createWebHistory } from "vue-router"

import { publicRoutes } from "./public"
import { privateRoutes } from "./private"

const routes = [...publicRoutes, ...privateRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

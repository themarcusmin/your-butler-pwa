import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import MainLayout from "@/components/Layouts/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/app",
      name: "app",
      component: MainLayout
    }
  ]
})

export default router

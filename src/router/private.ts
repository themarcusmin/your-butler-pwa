import MainLayout from "@/components/Layouts/MainLayout.vue"
import { authGuard } from "@auth0/auth0-vue"

const CalendarMonthView = () => import("@/features/calendar/routes/CalendarMonthView.vue")

export const privatePaths = [
  {
    path: "cal",
    name: "calendar",
    component: CalendarMonthView,
    beforeEnter: authGuard
  }
]

export const privateRoutes = [
  {
    path: "/app",
    component: MainLayout,
    children: privatePaths
  }
]

import MainLayout from "@/components/Layouts/MainLayout.vue"

const CalendarMonthView = () => import("@/features/calendar/routes/CalendarMonthView.vue")
// const SettingsView = () => import("@/features/settings/routes/SettingsView.vue")

export const CALENDAR = "calendar"
// export const SETTINGS = "settings"

export const privatePaths = [
  {
    path: CALENDAR,
    name: CALENDAR,
    component: CalendarMonthView
  }
  // {
  //   path: SETTINGS,
  //   name: SETTINGS,
  //   component: SettingsView
  // }
]

export const privateRoutes = [
  {
    path: "/app",
    component: MainLayout,
    children: privatePaths,
    meta: { requiresAuth: true }
  }
]

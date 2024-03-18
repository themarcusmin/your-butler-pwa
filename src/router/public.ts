const LandingView = () => import("@/features/misc/LandingView.vue")

export const LANDING = "landing"

export const publicRoutes = [
  {
    path: "/",
    name: LANDING,
    component: LandingView,
    meta: { requiresAuth: false }
  }
]

const ErrorView = () => import("@/components/ErrorView.vue")

export const errorRoute = [
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorView",
    component: ErrorView
  }
]

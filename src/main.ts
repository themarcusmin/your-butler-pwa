import { createApp } from "vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"

import App from "./App.vue"
import router from "@/router"
import { VueFire, VueFireAuth } from "vuefire"

import "./style.css"
import { firebaseApp } from "./lib/firebase"

const app = createApp(App)
const pinia = createPinia()

app.use(VueFire, {
  firebaseApp: firebaseApp,
  modules: [VueFireAuth()]
})

app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)

app.mount("#app")

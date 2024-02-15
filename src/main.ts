import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "@/router"
import { auth_0 } from "@/lib/auth0"

import "./style.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(auth_0)

app.mount("#app")

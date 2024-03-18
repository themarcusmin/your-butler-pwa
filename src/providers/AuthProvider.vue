<script setup lang="ts">
import { getCurrentUser } from "vuefire"

import router from "@/router"
import { LANDING } from "@/router/public"
import { CALENDAR } from "@/router/private"

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser()
  // redirect to landing page if unauthenticated
  if (to.meta.requiresAuth) {
    if (!currentUser)
      return {
        name: LANDING
      }
  }
  // redirect to calendar page if unauthenticated
  else if (to.meta.requiresAuth === false) {
    if (currentUser) return { name: CALENDAR }
  }
})
</script>

<template>
  <slot> </slot>
</template>

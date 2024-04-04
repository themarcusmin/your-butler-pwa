<script setup lang="ts">
import { ref } from "vue"
import { getCurrentUser } from "vuefire"

import router from "@/router"
import { LANDING } from "@/router/public"
import { CALENDAR } from "@/router/private"
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"

const isLoading = ref(false)

router.beforeEach(async (to) => {
  isLoading.value = true
  const currentUser = await getCurrentUser()
  isLoading.value = false

  // redirect to landing page if unauthenticated
  if (to.meta.requiresAuth) {
    if (!currentUser)
      return {
        name: LANDING
      }
  }
  // redirect to calendar page if authenticated
  else if (to.meta.requiresAuth === false) {
    if (currentUser) return { name: CALENDAR }
  }
})
</script>

<template>
  <template v-if="isLoading">
    <LoadingSpinner />
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue"
import router from "@/router"
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"
import { LANDING } from "@/router/public"

const { isAuthenticated, isLoading } = useAuth0()

router.beforeEach((to, from, next) => {
  if (to.name === LANDING && isAuthenticated.value) next({ name: "calendar" })
  else next()
})
</script>

<template>
  <template v-if="isAuthenticated">
    <slot></slot>
  </template>
  <template v-else-if="isLoading">
    <div class="h-dvh flex justify-center items-center">
      <LoadingSpinner />
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

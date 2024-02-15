<script setup lang="ts">
import router from "@/router"
import { useAuth0 } from "@auth0/auth0-vue"
const { loginWithRedirect } = useAuth0()

const { isAuthenticated } = useAuth0()

function getStarted() {
  if (isAuthenticated.value) router.push({ name: "calendar" })
  else loginWithRedirect()
}
</script>

<template>
  <div class="bg-white h-[100vh] flex items-center">
    <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Intent</span>
      </h2>
      <p>Get Work Done</p>
      <div class="mt-8 flex justify-center">
        <div
          class="inline-flex shadow border rounded-md px-6 py-2 bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer text-neutral-50"
        >
          <button class="cursor-pointer" @click="getStarted">GET STARTED</button>
        </div>
      </div>
    </div>
  </div>
</template>

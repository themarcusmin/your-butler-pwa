<script setup lang="ts">
import { signInWithRedirect, getRedirectResult } from "firebase/auth"
import { googleAuthProvider } from "@/lib/firebase"
import { useFirebaseAuth } from "vuefire"
import { onMounted, ref } from "vue"

import AppHead from "@/components/Head/AppHead.vue"
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"

const auth = useFirebaseAuth()!

const loadingSpinner = ref(false)
const error = ref(null)

async function getStarted() {
  signInWithRedirect(auth, googleAuthProvider)
    .catch((reason) => {
      console.error("Failed signinRedirect", reason)
      error.value = reason
    })
    .then(() => {
      loadingSpinner.value = true
    })
}

onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error("Failed redirect result", reason)
    error.value = reason
  })
})
</script>

<template>
  <AppHead description="Welcome to Intent" />
  <LoadingSpinner v-if="loadingSpinner" />
  <div v-else class="bg-white h-[100vh] flex items-center">
    <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Intent</span>
      </h2>
      <p>Get Work Done</p>
      <div class="mt-8 flex justify-center">
        <div
          class="inline-flex shadow border rounded-md px-6 py-2 bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer text-neutral-50"
        >
          <button id="login" class="cursor-pointer" @click="getStarted">GET STARTED</button>
        </div>
      </div>
    </div>
  </div>
</template>

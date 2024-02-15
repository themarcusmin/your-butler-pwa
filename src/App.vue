<script setup lang="ts">
import { RouterView } from "vue-router"
import AuthProvider from "@/providers/AuthProvider.vue"
import AppNotification from "@/components/Notifications/AppNotification.vue"
import Modal from "@/components/Overlays/GenericModal.vue"
</script>

<template>
  <AuthProvider>
    <RouterView />
    <Modal />
    <AppNotification />
  </AuthProvider>
</template>

<style lang=""></style>

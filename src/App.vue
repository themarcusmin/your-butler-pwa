<script setup lang="ts">
import { RouterView } from "vue-router"
import AppNotification from "@/components/Notifications/AppNotification.vue"
import Modal from "@/components/Overlays/GenericModal.vue"
</script>

<template>
  <RouterView />
  <Modal />
  <AppNotification />
</template>

<style lang=""></style>

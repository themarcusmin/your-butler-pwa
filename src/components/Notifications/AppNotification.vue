<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useNotificationStore } from "@/stores/notification"
import ToastNotification from "@/components/Notifications/ToastNotification.vue"

const store = useNotificationStore()
const { notifications } = storeToRefs(store)
const { dismiss } = store
</script>

<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <ToastNotification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @dismiss="dismiss(notification.id)"
    />
  </div>
</template>

import { ref } from "vue"
import { defineStore } from "pinia"
import { nanoid } from "nanoid"

type NotificationType = "success" | "error"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([])

  function add(notification: Omit<Notification, "id">): void {
    notifications.value = [...notifications.value, { id: nanoid(), ...notification }]
  }

  function dismiss(id: string) {
    notifications.value = notifications.value.filter((notification) => notification.id != id)
  }

  return { notifications, add, dismiss }
})

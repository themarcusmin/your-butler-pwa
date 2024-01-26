import { ref, onMounted } from "vue"
import { defineStore } from "pinia"

import { getDates } from "@/utils/calendar"
import type { CalendarDate } from "@/utils/calendar"

export const useCalendarStore = defineStore("counter", () => {
  const currentMonth = ref<number>(0)
  const currentYear = ref<number>(0)
  const days = ref<CalendarDate[]>()

  onMounted(() => {
    const today = new Date()
    currentMonth.value = today.getMonth()
    currentYear.value = today.getFullYear()
    days.value = getDates(currentMonth.value, currentYear.value)
  })

  function nextMonth(): void {
    if (currentMonth.value == 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
    days.value = getDates(currentMonth.value, currentYear.value)
  }

  function previousMonth(): void {
    if (currentMonth.value == 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
    days.value = getDates(currentMonth.value, currentYear.value)
  }

  return { currentMonth, currentYear, days, nextMonth, previousMonth }
})

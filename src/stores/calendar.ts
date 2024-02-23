import { ref } from "vue"
import { defineStore } from "pinia"

import { getDates } from "@/utils/calendar"
import type { CalendarDate } from "@/utils/calendar"

export const useCalendarStore = defineStore("calendar", () => {
  const today = new Date()

  const currentMonth = ref<number>(today.getMonth())
  const currentYear = ref<number>(today.getFullYear())
  const days = ref<CalendarDate[]>(getDates(currentMonth.value, currentYear.value))
  const selectedDay = ref(days.value.find((day) => day.isToday))

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

  function setSelectedDay(day: CalendarDate) {
    selectedDay.value = day
  }

  return { currentMonth, currentYear, days, nextMonth, previousMonth, selectedDay, setSelectedDay }
})

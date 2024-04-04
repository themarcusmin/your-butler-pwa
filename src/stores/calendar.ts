import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { startOfDay, endOfDay } from "date-fns"

import { getDates } from "@/utils/calendar"
import type { CalendarDate } from "@/utils/calendar"

export const useCalendarStore = defineStore("calendar", () => {
  const today = new Date()

  const currentMonth = ref<number>(today.getMonth())
  const currentYear = ref<number>(today.getFullYear())

  const daysTemplate = computed(() => getDates(currentMonth.value, currentYear.value))
  const eventStartTime = computed(() =>
    startOfDay(new Date(daysTemplate.value[0].date)).toISOString()
  )
  const eventEndTime = computed(() =>
    endOfDay(new Date(daysTemplate.value[daysTemplate.value.length - 1].date)).toISOString()
  )

  const selectedDay = ref(daysTemplate.value.find((day) => day.isToday))

  function nextMonth(): void {
    if (currentMonth.value == 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }

  function previousMonth(): void {
    if (currentMonth.value == 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }

  function setSelectedDay(day: CalendarDate) {
    selectedDay.value = day
  }

  return {
    currentMonth,
    currentYear,
    eventStartTime,
    eventEndTime,
    nextMonth,
    previousMonth,
    selectedDay,
    setSelectedDay
  }
})

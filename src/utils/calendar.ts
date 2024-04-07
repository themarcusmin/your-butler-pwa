import {
  getISODay,
  getDaysInMonth,
  lightFormat,
  format,
  subDays,
  addDays,
  addMonths,
  parseISO,
  startOfDay,
  endOfDay
} from "date-fns"

import { RECURRENCE } from "@/features/calendar/types"
import type { Event, AddEventForm } from "@/features/calendar/types"
import type { CreateEventDTO } from "@/features/calendar/api/createEvent"

export interface CalendarEvent {
  id: number
  title: string
  description: string
  location: string
  timeRange12HourFormat: string
  eventStartTime: string
  eventEndTime: string
  repeatMode: string
  repeatEndDate?: string
}

export interface CalendarDate {
  date: string
  isCurrentMonth?: boolean
  events: CalendarEvent[]
  isToday?: boolean
  isSelected?: boolean
}

/**
 * check if date string is today
 * @param date i.e "2024-02-01"
 */
function checkIsToday(date: string): boolean {
  const inputDate = new Date(date)
  const todayDate = new Date()
  if (inputDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0)) return true
  return false
}

interface DateFormatterProps {
  date: string
  isCurrentMonth?: boolean
}
/**
 * format date for tailwind calendar
 */
function dateFormatter({ date, isCurrentMonth }: DateFormatterProps): CalendarDate {
  let isToday
  if (isCurrentMonth && checkIsToday(date)) isToday = true
  return {
    date: date,
    ...(isCurrentMonth && { isCurrentMonth }),
    ...(isToday && { isToday }),
    events: []
  }
}

/**
 * generate a list of CalendarDate
 * i.e. [{ date: "2024-02-01", ...}, ...]
 * month starts from 0
 */
export function getDates(month: number, year: number): CalendarDate[] {
  const numberOfDays = getDaysInMonth(new Date(year, month))
  const currentMonthDatesRaw = Array.from({ length: numberOfDays }, (_, i) =>
    lightFormat(new Date(year, month, i + 1).toISOString(), "yyyy-MM-dd")
  )
  const currentMonthDates = currentMonthDatesRaw.map((date: string) =>
    dateFormatter({ date, isCurrentMonth: true })
  )
  // check if first date is Monday
  const firstDayOfMonth = getISODay(currentMonthDates[0].date)
  const previousMonthDates = []
  // since it's not monday, get the preceding dates
  if (firstDayOfMonth != 1) {
    for (let i = 1; i < firstDayOfMonth; i++) {
      const previousMonthDate = format(
        subDays(currentMonthDates[0].date, firstDayOfMonth - i),
        "yyyy-MM-dd"
      )
      const formattedPreviousMonthDate = dateFormatter({
        date: previousMonthDate,
        isCurrentMonth: false
      })
      previousMonthDates.push(formattedPreviousMonthDate)
    }
  }
  // check if last date is Sunday
  const lastIndex = currentMonthDates.length - 1
  const lastDayOfMonth = getISODay(currentMonthDates[lastIndex].date)
  const nextMonthDates = []
  // since it's not sunday, get the succeeding dates
  if (lastDayOfMonth != 7) {
    for (let i = 1; i <= 7 - lastDayOfMonth; i++) {
      const nextMonthDate = format(addDays(currentMonthDates[lastIndex].date, i), "yyyy-MM-dd")
      const formattedNextMonthDate = dateFormatter({ date: nextMonthDate, isCurrentMonth: false })
      nextMonthDates.push(formattedNextMonthDate)
    }
  }
  return [...previousMonthDates, ...currentMonthDates, ...nextMonthDates]
}

/**
 * generate a list of indices (reflecting dates) for recurring events
 *  - helper for populatedDays
 */
export function getListOfIndices(
  days: CalendarDate[],
  startDate: string,
  recurringEndDate: string,
  recurringMode: string
): number[] {
  // index of start date
  const date = format(parseISO(startDate), "yyyy-MM-dd")
  const startIndex = days.findIndex((day) => day.date === date)
  let s = startIndex === -1 ? 0 : startIndex // account for startingDate not in days (recurring event from another period)
  // index of recurring end date
  let e
  if (recurringMode === null) e = s
  else {
    const endDate = format(parseISO(recurringEndDate), "yyyy-MM-dd")
    // index is either end of month's index or recurringEndDate's
    e =
      days.findIndex((day) => day.date === endDate) !== -1
        ? days.findIndex((day) => day.date === endDate)
        : days.length - 1
  }
  // indices of all recurring date
  let recurringIndices = [s]
  if (recurringMode === RECURRENCE.DAILY)
    recurringIndices = Array.from({ length: e - s + 1 }, (_, a) => a + s)
  else if (recurringMode === RECURRENCE.WEEKLY) {
    s += 7
    while (s <= e) {
      recurringIndices.push(s)
      s += 7
    }
  } else if (recurringMode === RECURRENCE.MONTHLY) {
    let dateAddable = startDate
    let nextMonthDate = format(addMonths(new Date(dateAddable), 1), "yyyy-MM-dd")
    let complete = false
    while (!complete && recurringEndDate >= nextMonthDate) {
      nextMonthDate = format(addMonths(new Date(dateAddable), 1), "yyyy-MM-dd")
      const i = days.findIndex((day) => day.date === nextMonthDate)
      if (i === -1) complete = true
      else {
        recurringIndices.push(i)
        dateAddable = nextMonthDate
      }
    }
  }
  // todo: yearly
  return recurringIndices
}

interface PopulatedDaysOptions {
  events: Event[]
  timeRange: { month: number; year: number }
}

/**
 * populate days with events
 */
export function populatedDays(options: PopulatedDaysOptions): CalendarDate[] {
  const {
    events,
    timeRange: { month, year }
  } = options
  const days = getDates(month, year)

  events.forEach((event) => {
    const newEvent = {
      id: event.eventId,
      title: event.title,
      description: event.description,
      location: event.location,
      eventStartTime: event.startTime,
      eventEndTime: event.endTime,
      timeRange12HourFormat: `${format(parseISO(event.startTime), "h:mm aa")} - ${format(parseISO(event.endTime), "h:mm aa")}`,
      repeatMode: event.recurringMode,
      repeatEndDate: event.recurringEndDate
    }

    // indices where each event can be added
    const recurringIndices = getListOfIndices(
      days,
      event.startTime,
      event.recurringEndDate,
      event.recurringMode
    )

    // add event to days accordingly
    recurringIndices.forEach((r) => {
      let j = 0
      for (let k = 0; k < days[r].events.length; k++) {
        const existingStartTime = format(parseISO(days[r].events[k].eventStartTime), "HH:mm:ss")
        const newStartTime = format(parseISO(event.startTime), "HH:mm:ss")
        if (newStartTime > existingStartTime) {
          j++
        } else {
          break
        }
      }
      days[r].events.splice(j, 0, newEvent)
    })
  })
  return days
}

/**
 * convert raw form values to request-ready values
 *  - helper for AddEventForm data
 */
export const transformCreateEventData = (values: AddEventForm) => {
  const {
    title,
    description,
    location,
    eventDate,
    eventTime: { allDay, eventStartTime, eventEndTime, nextDay },
    repeat: { repeatMode, repeatEndDate }
  } = values
  const transformedData: CreateEventDTO = {
    title,
    description,
    location,
    eventStartTime: "",
    eventEndTime: "",
    repeatMode,
    repeatEndDate: undefined
  }
  transformedData["eventStartTime"] = allDay
    ? startOfDay(new Date(eventDate)).toISOString()
    : new Date(`${eventDate} ${eventStartTime}`).toISOString()
  transformedData["eventEndTime"] = allDay
    ? endOfDay(new Date(eventDate)).toISOString()
    : nextDay
      ? new Date(addDays(`${eventDate} ${eventEndTime}`, 1)).toISOString()
      : new Date(`${eventDate} ${eventEndTime}`).toISOString()
  transformedData["repeatEndDate"] =
    repeatMode != RECURRENCE.NEVER ? new Date(`${repeatEndDate} 23:59:59`).toISOString() : undefined
  return transformedData
}

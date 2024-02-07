import { getISODay, getDaysInMonth, lightFormat, format, subDays, addDays } from "date-fns"

interface Event {
  id: number
  name: string
  time: string
  datetime: string
  href: string
}

export interface CalendarDate {
  date: string
  isCurrentMonth?: boolean
  events: Event[]
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

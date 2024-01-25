import { getISODay, getDaysInMonth, lightFormat, format, subDays, addDays } from "date-fns"

/**
 * format date for tailwind calendar
 */
function dateFormatter(date: string, isCurrentMonth = true) {
  return { date: date, isCurrentMonth, events: [] }
}

/**
 * generate a list of dates
 * i.e. ['2024-02-01', '2024-02-02', ...]
 */
export function getDates(month: number, year: number) {
  const numberOfDays = getDaysInMonth(new Date(year, month - 1, 15))
  const currentMonthDatesRaw = Array.from({ length: numberOfDays }, (_, i) =>
    lightFormat(new Date(year, month - 1, i + 1).toISOString(), "yyyy-MM-dd")
  )
  const currentMonthDates = currentMonthDatesRaw.map((date: string) => dateFormatter(date))
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
      const formattedPreviousMonthDate = dateFormatter(previousMonthDate, false)
      previousMonthDates.push(formattedPreviousMonthDate)
    }
  }
  // check if last date is Sunday
  const lastIndex = currentMonthDates.length - 1
  const lastDayOfMonth = getISODay(currentMonthDates[lastIndex].date)
  console.log("tt: ", lastDayOfMonth)
  const nextMonthDates = []
  // since it's not sunday, get the succeeding dates
  if (lastDayOfMonth != 7) {
    for (let i = 1; i <= 7 - lastDayOfMonth; i++) {
      const nextMonthDate = format(addDays(currentMonthDates[lastIndex].date, i), "yyyy-MM-dd")
      const formattedNextMonthDate = dateFormatter(nextMonthDate, false)
      nextMonthDates.push(formattedNextMonthDate)
    }
  }
  return [...previousMonthDates, ...currentMonthDates, ...nextMonthDates]
}
import { getISODay, getDaysInMonth, lightFormat, format, subDays  } from "date-fns"

/**
 * format date for tailwind calendar
 */
function dateFormatter(date: string, isCurrentMonth=true) {
  return { date: date, isCurrentMonth, events: [] }
}

/**
 * generate a list of dates
 * i.e. ['2024-02-01', '2024-02-02', ...]
 */
export function getDates(month: number, year: number) {
  const numberOfDays = getDaysInMonth(new Date(year, month - 1, 15))
  const currentMonthDatesRaw = Array.from({length: numberOfDays}, (_, i) => lightFormat(new Date(year, month - 1, i + 1).toISOString(), "yyyy-MM-dd"));
  const currentMonthDates = currentMonthDatesRaw.map((date: string) => dateFormatter(date))
  // check if first date is Monday
  const firstDayOfMonth = getISODay(currentMonthDates[0].date)
  const previousMonthDates = []
  // since it's not monday, get the preceding dates
  if (firstDayOfMonth != 1) {
    for (let i = 1; i < firstDayOfMonth; i++) {
      const previousMonthDate = format(subDays(currentMonthDates[0].date, firstDayOfMonth - i), "yyyy-MM-dd")
      const formattedPreviousMonthDate = dateFormatter(previousMonthDate, false)
      previousMonthDates.push(formattedPreviousMonthDate)
    }
  }
  return [...previousMonthDates, ...currentMonthDates]
}

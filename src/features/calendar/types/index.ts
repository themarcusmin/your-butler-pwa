export interface Event {
  eventId: number
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
  recurringMode: string
  recurringEndDate: string
}

export enum RECURRENCE {
  NEVER = "never",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly"
}

export interface AddEventForm {
  title: string
  description?: string
  location?: string

  eventDate: string
  eventTime: {
    allDay: boolean
    eventStartTime?: string
    eventEndTime?: string
    nextDay?: boolean
  }
  repeat: {
    repeatMode: RECURRENCE
    repeatEndDate?: string
  }
}

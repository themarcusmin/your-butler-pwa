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
  NEVER = "NEVER",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
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

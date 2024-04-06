import type { Ref } from "vue"
import { useQuery } from "@tanstack/vue-query"
import type { AxiosResponse } from "axios"
import type { Event } from "../types"

import { axios } from "@/lib/axios"

interface GetEventsDTO {
  eventStartTime: string
  eventEndTime: string
}

export const getEvents = (data: GetEventsDTO): Promise<AxiosResponse<Event[], any>> =>
  axios.get("/api/event/", { params: { ...data } })

interface useEventsOptions {
  eventStartTime: Ref<string>
  eventEndTime: Ref<string>
}

export const useEvents = ({ eventStartTime, eventEndTime }: useEventsOptions) => {
  return useQuery({
    queryKey: ["events", eventStartTime, eventEndTime],
    queryFn: () =>
      getEvents({ eventStartTime: eventStartTime.value, eventEndTime: eventEndTime.value }),
    select: (response) => response.data,
    refetchOnWindowFocus: false
  })
}

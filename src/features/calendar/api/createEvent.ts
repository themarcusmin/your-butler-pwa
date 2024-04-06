import { useMutation, useQueryClient } from "@tanstack/vue-query"
import type { AxiosResponse } from "axios"

import { axios } from "@/lib/axios"
import { useNotificationStore } from "@/stores/notification"

export interface CreateEventDTO {
  title: string
  description?: string
  location?: string
  eventStartTime: string
  eventEndTime: string
  repeatMode: string
  repeatEndDate?: string
}

interface CreateEventResponse {
  id: number
}

const createEvent = (data: CreateEventDTO): Promise<AxiosResponse<CreateEventResponse, any>> =>
  axios.post("/api/event/create", data)

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  const store = useNotificationStore()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      store.add({ type: "success", title: "Event Added" })
    },
    mutationFn: createEvent
  })
}

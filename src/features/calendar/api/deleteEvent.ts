import { useMutation, useQueryClient } from "@tanstack/vue-query"
import type { AxiosResponse } from "axios"

import { axios } from "@/lib/axios"

interface DeleteEventDTO {
  id: number
}

const deleteEvent = (data: DeleteEventDTO): Promise<AxiosResponse<any, any>> =>
  axios.delete("/api/event/", { params: { ...data } })

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
    mutationFn: deleteEvent
  })
}

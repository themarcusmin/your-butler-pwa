<script setup lang="ts">
const props = defineProps<{ formTitle: string; id: string }>()
const { id } = props

import { TrashIcon } from "@heroicons/vue/24/solid"
import BaseButton from "@/components/Elements/BaseButton.vue"
import { useDeleteEvent } from "@/features/calendar/api/deleteEvent"
import { useModalStore } from "@/stores/modal"
import { useCalendarStore } from "@/stores/calendar"

const { closeModal } = useModalStore()
const { setSelectedDay } = useCalendarStore()
const { isPending, mutateAsync } = useDeleteEvent()

const onSubmit = async () => {
  const data = { id }
  await mutateAsync(data)
  setSelectedDay()
  closeModal()
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-400 sm:mx-0 sm:h-10 sm:w-10"
      >
        <TrashIcon class="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
          >Delete Event</DialogTitle
        >
        <div class="mt-2">
          <p class="text-sm text-gray-500">Are you sure you want to delete this event?</p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <BaseButton type="submit" :isLoading="isPending" loaderText="Deleting" variant="danger"
        >Delete</BaseButton
      >
      <BaseButton type="button" @click="closeModal" variant="plain">Cancel</BaseButton>
    </div>
  </form>
</template>

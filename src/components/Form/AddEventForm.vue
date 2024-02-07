<script setup lang="ts">
import { ref } from "vue"
import { useNotificationStore } from "@/stores/notification"
import { useModalStore } from "@/stores/modal"

defineProps<{ title: string }>()

const details = ref("")
const notificationStore = useNotificationStore()
const { add } = notificationStore

const modalStore = useModalStore()
const { closeModal } = modalStore

function onSubmit() {
  add({ type: "success", title: "Event Added", message: `${details.value}` })
  closeModal()
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ title }}</h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="details" class="block text-sm font-medium leading-6 text-gray-900"
              >Details</label
            >
            <div class="mt-2">
              <input
                v-model="details"
                type="text"
                name="details"
                id="details"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
              >Date</label
            >
            <div class="mt-2">
              <input
                type="date"
                name="date"
                id="date"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
              >From</label
            >
            <div class="mt-2">
              <input
                type="time"
                name="time-from"
                id="time-from"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
              >To</label
            >
            <div class="mt-2">
              <input
                type="time"
                name="time-to"
                id="time-to"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="details" class="block text-sm font-medium leading-6 text-gray-900"
              >Location</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="details"
                id="details"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        @click="closeModal"
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

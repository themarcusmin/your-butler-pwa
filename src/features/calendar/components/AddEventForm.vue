<script setup lang="ts">
defineProps<{ formTitle: string }>()

// Toggle
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue"

// Validation
import { onMounted, watch } from "vue"
import { useField, useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import * as zod from "zod"
import { format, addHours, isBefore } from "date-fns"

import { RECURRENCE, type AddEventForm } from "../types"

const schema = zod
  .object({
    title: zod.string().min(1, { message: "Required" }),
    eventDate: zod.string().default(format(new Date(), "yyyy-MM-dd")),
    eventTime: zod
      .object({
        allDay: zod.boolean().default(true),
        eventStartTime: zod.string().optional(),
        eventEndTime: zod.string().optional(),
        nextDay: zod.boolean().optional()
      })
      .superRefine(({ allDay, eventStartTime, eventEndTime, nextDay }, ctx) => {
        if (!allDay) {
          if (!eventStartTime) {
            ctx.addIssue({
              code: "custom",
              message: "Required",
              path: ["eventStartTime"]
            })
          }
          if (!eventEndTime) {
            ctx.addIssue({
              code: "custom",
              message: "Required",
              path: ["eventEndTime"]
            })
          }
          if ((eventStartTime as string) > (eventEndTime as string) && !nextDay) {
            ctx.addIssue({
              code: "custom",
              message: "Cannot be before start time",
              path: ["eventEndTime"]
            })
          }
        }
      }),
    location: zod.string().optional(),
    description: zod.string().optional(),
    repeat: zod
      .object({
        repeatMode: zod.nativeEnum(RECURRENCE).default(RECURRENCE.NEVER),
        repeatEndDate: zod.string().optional()
      })
      .superRefine(({ repeatMode, repeatEndDate }, ctx) => {
        if (repeatMode != RECURRENCE.NEVER) {
          if (!repeatEndDate) {
            ctx.addIssue({
              code: "custom",
              message: "Required",
              path: ["repeatEndDate"]
            })
          }
        }
      })
  })
  .superRefine(({ eventDate, repeat: { repeatEndDate } }, ctx) => {
    if (eventDate && repeatEndDate) {
      if (isBefore(new Date(repeatEndDate), new Date(eventDate))) {
        ctx.addIssue({
          code: "custom",
          message: "Cannot be before selected date",
          path: ["repeat.repeatEndDate"]
        })
      }
    }
  })

const validationSchema = toTypedSchema(schema)
const { handleSubmit, errors } = useForm<AddEventForm>({
  validationSchema
})
const { value: title } = useField("title")
const { value: eventDate } = useField("eventDate")
const { value: allDay } = useField("eventTime.allDay")
const { value: eventStartTime } = useField("eventTime.eventStartTime")
const { value: eventEndTime } = useField("eventTime.eventEndTime")
const { value: nextDay } = useField("eventTime.nextDay")
const { value: location } = useField("location")
const { value: repeatMode } = useField("repeat.repeatMode")
const { value: repeatEndDate } = useField("repeat.repeatEndDate")
const { value: description } = useField("description")

// Form helper
onMounted(() => {
  // (Known Issue) workaround for default values: https://vee-validate.logaretm.com/v4/integrations/zod-schema-validation/
  eventDate.value = format(new Date(), "yyyy-MM-dd")
  repeatMode.value = RECURRENCE.NEVER
  allDay.value = true
})
watch(allDay, (isChecked) => {
  if (isChecked) {
    eventStartTime.value = undefined
    eventEndTime.value = undefined
    nextDay.value = undefined
  } else {
    eventStartTime.value = format(new Date(), "HH:mm")
    eventEndTime.value = format(addHours(new Date(), 1), "HH:mm")
    // check nextDay because past midnight
    if ((eventStartTime.value as string) > (eventEndTime.value as string)) nextDay.value = true
    else nextDay.value = false
  }
})

// add event request
import { useModalStore } from "@/stores/modal"
import { useCreateEvent } from "@/features/calendar/api/createEvent"
import BaseButton from "@/components/Elements/BaseButton.vue"
import { transformCreateEventData } from "@/utils/calendar"

const modalStore = useModalStore()
const { closeModal } = modalStore

const { isPending, mutateAsync } = useCreateEvent()

const onSubmit = handleSubmit(async (values) => {
  const transformedData = transformCreateEventData(values)
  await mutateAsync(transformedData)
  closeModal() // todo: handle error
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="title"
                name="title"
                id="title"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span class="text-sm text-red-500">{{ errors.title }}</span>
          </div>

          <div class="sm:col-span-3">
            <label for="eventDate" class="block text-sm font-medium leading-6 text-gray-900"
              >Date</label
            >
            <div class="mt-2">
              <input
                v-model="eventDate"
                type="date"
                name="eventDate"
                id="eventDate"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span class="text-sm text-red-500">{{ errors.eventDate }}</span>
          </div>

          <div class="sm:col-span-3 flex items-end content-end">
            <SwitchGroup as="div" class="flex flex-col">
              <SwitchLabel as="span" class="mb-4 text-sm">
                <span class="font-medium text-gray-900">All Day</span>
              </SwitchLabel>
              <Switch
                v-model="allDay"
                name="allDay"
                :class="[
                  allDay ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    allDay ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  ]"
                />
              </Switch>
            </SwitchGroup>
          </div>

          <transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-300"
            leave-active-class="transition duration-300"
          >
            <div class="col-span-full" v-if="!allDay">
              <div class="sm:col-span-3">
                <label
                  for="eventStartTime"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >From</label
                >
                <div class="mt-2">
                  <input
                    v-model="eventStartTime"
                    type="time"
                    name="eventStartTime"
                    id="eventStartTime"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span class="text-sm text-red-500">{{ errors["eventTime.eventStartTime"] }}</span>
              </div>

              <div class="sm:col-span-3 sm:mt-4">
                <div class="flex justify-between">
                  <label
                    for="eventEndTime"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >To</label
                  >
                  <div>
                    <label for="nextDay" class="text-xs font-semibold mr-2">Next Day</label>
                    <input type="checkbox" id="nextDay" v-model="nextDay" />
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    v-model="eventEndTime"
                    type="time"
                    name="eventEndTime"
                    id="eventEndTime"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span class="text-sm text-red-500">{{ errors["eventTime.eventEndTime"] }}</span>
              </div>
            </div>
          </transition>

          <div class="col-span-full">
            <label for="location" class="block text-sm font-medium leading-6 text-gray-900"
              >Location</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="location"
                name="location"
                id="location"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="repeatMode" class="block text-sm font-medium leading-6 text-gray-900"
              >Repeat</label
            >
            <select
              id="repeatMode"
              v-model="repeatMode"
              name="repeatMode"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option :value="RECURRENCE.NEVER">Never</option>
              <option :value="RECURRENCE.DAILY">Every Day</option>
              <option :value="RECURRENCE.WEEKLY">Every Week</option>
              <option :value="RECURRENCE.MONTHLY">Every Month</option>
              <option :value="RECURRENCE.YEARLY">Every Year</option>
            </select>
          </div>

          <div class="col-span-full" v-if="repeatMode != 'never'">
            <label for="repeatEndDate" class="block text-sm font-medium leading-6 text-gray-900"
              >End Date</label
            >
            <div class="mt-2">
              <input
                id="repeatEndDate"
                v-model="repeatEndDate"
                :min="eventDate as string"
                type="date"
                name="enddate"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span class="text-sm text-red-500">{{ errors["repeat.repeatEndDate"] }}</span>
          </div>

          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
              >Notes</label
            >
            <div class="mt-2">
              <textarea
                v-model="description"
                rows="4"
                name="description"
                id="description"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <BaseButton type="button" @click="closeModal" variant="plain">Cancel</BaseButton>
      <BaseButton type="submit" :isLoading="isPending" loaderText="Saving">Save</BaseButton>
    </div>
  </form>
</template>

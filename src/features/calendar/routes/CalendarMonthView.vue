<template>
  <AppHead title="Calendar" />
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="lg:flex lg:h-full lg:flex-col">
    <header
      class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none"
    >
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        <time>{{
          Intl.DateTimeFormat("en", { month: "long" }).format(
            new Date((currentMonth + 1).toString())
          ) +
          " " +
          currentYear
        }}</time>
      </h1>
      <div class="flex items-center">
        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            @click="previousMonth"
          >
            <span class="sr-only">Previous month</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            @click="nextMonth"
          >
            <span class="sr-only">Next month</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" class="relative">
            <MenuButton
              type="button"
              class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Month view
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                      >Day view</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                      >Week view</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                      >Month view</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                      >Year view</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <div class="ml-6 h-6 w-px bg-gray-300" />
          <button
            @click="openAddEventModal"
            type="button"
            class="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add event
          </button>
        </div>
        <Menu as="div" class="relative ml-6 md:hidden">
          <MenuButton
            class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Open menu</span>
            <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Create event</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Go to today</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Day view</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Week view</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Month view</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >Year view</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </header>
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div
        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
      >
        <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">on</span></div>
        <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">ue</span></div>
        <div class="bg-white py-2">W<span class="sr-only sm:not-sr-only">ed</span></div>
        <div class="bg-white py-2">T<span class="sr-only sm:not-sr-only">hu</span></div>
        <div class="bg-white py-2">F<span class="sr-only sm:not-sr-only">ri</span></div>
        <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">at</span></div>
        <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">un</span></div>
      </div>
      <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div
          class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px"
          :class="[days.length > 35 ? 'lg:grid-rows-6' : 'lggrid-rows-5']"
        >
          <div
            v-for="day in days"
            :key="day.date"
            :item="day"
            :class="[
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-150 text-gray-500',
              'relative px-3 py-2'
            ]"
            @click="setSelectedDay(day)"
          >
            <time
              :datetime="day.date"
              :class="
                day.isToday
                  ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                  : undefined
              "
              >{{
                // @ts-ignore
                day.date.split("-").pop().replace(/^0/, "")
              }}</time
            >
            <ol v-if="day.events.length > 0" class="mt-2">
              <li v-for="event in day.events.slice(0, 2)" :key="event.id">
                <!-- todo @daily view: :href="`event/${event.id}`" -->
                <a class="group flex">
                  <p
                    class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
                  >
                    {{ event.title }}
                  </p>
                  <time
                    :datetime="event.eventStartTime"
                    class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                    >{{ event.description }}</time
                  >
                </a>
              </li>
              <li v-if="day.events.length > 2" class="text-gray-500">
                + {{ day.events.length - 2 }} more
              </li>
            </ol>
          </div>
        </div>
        <!-- for smaller screens -->
        <div
          class="isolate grid w-full grid-cols-7 gap-px lg:hidden"
          :class="[days.length > 35 ? 'grid-rows-6' : 'grid-rows-5']"
        >
          <button
            v-for="day in days"
            :key="day.date"
            type="button"
            :class="[
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              (day.isSelected || day.isToday) && 'font-semibold',
              day.isSelected && 'text-white',
              !day.isSelected && day.isToday && 'text-indigo-600',
              !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
              !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
              'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10'
            ]"
          >
            <time
              :datetime="day.date"
              :class="[
                day.isToday &&
                  'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white',
                day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                'ml-auto'
              ]"
              >{{
                // @ts-ignore
                day.date.split("-").pop().replace(/^0/, "")
              }}</time
            >
            <span class="sr-only">{{ day.events.length }} events</span>
            <span v-if="day.events.length > 0" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
              <span
                v-for="event in day.events"
                :key="event.id"
                class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedDay && selectedDay.events.length > 0" class="px-4 py-10 sm:px-6">
      <div>
        <h1 class="mb-4 text-left text-base leading-6 text-gray-500">
          {{ format(selectedDay.date, "MMMM d, yyyy") }}
        </h1>
      </div>
      <ol
        class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
      >
        <li
          v-for="event in selectedDay.events"
          :key="event.id"
          class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
        >
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">{{ event.title }}</p>
            <time :datetime="event.eventStartTime" class="mt-2 flex items-center text-gray-700">
              <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ event.timeRange12HourFormat }}
            </time>
          </div>
          <!-- todo @daily view: :href="`event/${event.id}`" -->
          <!-- <button
            class="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
            @click="openEditEventModal(event)"
          >
            Edit<span class="sr-only">, {{ event.title }}</span>
          </button> -->
          <button
            class="ml-6 flex-none self-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white opacity-0 shadow-sm ring-1 ring-inset ring-red-500 hover:ring-red-500 focus:opacity-100 group-hover:opacity-100 hover:bg-red-500"
            @click="openDeleteEventModal(event.id)"
          >
            Delete<span class="sr-only">, {{ event.title }}</span>
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRaw } from "vue"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon
} from "@heroicons/vue/20/solid"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { format } from "date-fns"

import { useCalendarStore } from "@/stores/calendar"
import { useModalStore } from "@/stores/modal"
import { storeToRefs } from "pinia"

import AppHead from "@/components/Head/AppHead.vue"
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"
import AddEventForm from "@/features/calendar/components/AddEventForm.vue"
import DeleteEventConfirmation from "@/features/calendar/components/DeleteEventConfirmation.vue"
import { useEvents } from "@/features/calendar/api/getEvents"
import { getDates, populatedDays, type CalendarDate } from "@/utils/calendar"

const store = useCalendarStore()
const { currentMonth, currentYear, selectedDay, eventStartTime, eventEndTime } = storeToRefs(store)
const { previousMonth, nextMonth, setSelectedDay } = store
const modalStore = useModalStore()
const { openModal } = modalStore

function openAddEventModal() {
  openModal({ component: AddEventForm, props: { formTitle: "Add Event" } })
}

function openDeleteEventModal(id: number) {
  openModal({ component: DeleteEventConfirmation, props: { formTitle: "Delete Event", id } })
}

/**
 * data fetching & transformation
 */
import type { Event } from "../types"

const { data, isLoading } = useEvents({
  eventStartTime: eventStartTime,
  eventEndTime: eventEndTime
})

interface CalendarDictionary {
  [key: string]: Event[]
}

const calendarDictionary = ref<CalendarDictionary>({})

const days = computed<CalendarDate[]>(() => {
  const events = calendarDictionary.value[`${eventStartTime.value}-${eventEndTime.value}`]
  if (events && events.length) {
    return populatedDays({
      events,
      timeRange: { month: currentMonth.value, year: currentYear.value }
    })
  }
  return getDates(currentMonth.value, currentYear.value)
})

watch(data, (newData) => {
  const newEvents = toRaw(newData)
  if (newEvents && newEvents.length)
    calendarDictionary.value = {
      ...calendarDictionary.value,
      [`${eventStartTime.value}-${eventEndTime.value}`]: newEvents
    }
})
</script>

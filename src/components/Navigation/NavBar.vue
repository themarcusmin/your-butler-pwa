<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/vue"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { signOut } from "firebase/auth"
import { useCurrentUser, useFirebaseAuth } from "vuefire"

import { useRoute } from "vue-router"
import router from "@/router"
import { LANDING } from "@/router/public"
import { CALENDAR, SETTINGS } from "@/router/private"
import logo from "@/assets/logo.svg"

const navItems = [
  {
    href: CALENDAR,
    routeName: CALENDAR,
    title: "Calendar"
  },
  {
    href: SETTINGS,
    routeName: SETTINGS,
    title: "Settings"
  }
]

const user = useCurrentUser()!
const auth = useFirebaseAuth()!
const route = useRoute()

async function logout() {
  await signOut(auth)
  router.push({ name: LANDING })
}

if (user) {
  console.log("aasasf", user)
}
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" :src="logo" alt="Intent Logo" />
          </div>
          <template v-for="navItem in navItems" :key="navItem.routeName">
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                :href="navItem.href"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500"
                :class="{
                  'border-indigo-500 text-gray-900 border-b-2': route.name === navItem.routeName
                }"
                >{{ navItem.title }}</a
              >
            </div>
          </template>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            type="button"
            class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1610960945977-6642a33b05de?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-if="user" v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >{{ user.providerData[0].displayName }}</a
                  >
                </MenuItem>
                <!-- <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Settings</a
                  >
                </MenuItem> -->
                <MenuItem v-slot="{ active }" @click="logout">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <template v-for="navItem in navItems" :key="navItem.routeName">
          <DisclosureButton
            as="a"
            :href="navItem.href"
            class="block py-2 pl-3 pr-4 text-base font-medium text-gray-500"
            :class="{
              'block border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700 ':
                route.name === navItem.routeName
            }"
            >{{ navItem.title }}</DisclosureButton
          >
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              :href="navItem.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500"
              :class="{
                'border-indigo-500 text-gray-900 border-b-2': route.name === navItem.routeName
              }"
              >{{ navItem.title }}</a
            >
          </div>
        </template>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1610960945977-6642a33b05de?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div class="ml-3" v-if="user">
            <div class="text-base font-medium text-gray-800">
              {{ user.providerData[0].displayName }}
            </div>
            <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
          </div>
          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <!-- <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Your Profile</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Settings</DisclosureButton
          > -->
          <DisclosureButton
            @click="logout"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

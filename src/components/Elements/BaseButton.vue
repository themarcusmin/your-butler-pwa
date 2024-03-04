<script lang="ts">
import BaseSpinner from "./BaseSpinner.vue"

export const variants = {
  primary:
    "text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  plain: "text-gray-900"
}

const sizes = {
  sm: "px-4 py-2 text-sm font-semibold"
}

interface BaseButtonProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
  loaderText?: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<BaseButtonProps>(), {
  variant: "primary",
  size: "sm",
  isLoading: false,
  loaderText: ""
})
</script>

<template>
  <button
    class="inline-flex items-center rounded-lg leading-6"
    :class="[variants[variant], sizes[size]]"
  >
    <BaseSpinner v-if="isLoading" />
    <template v-if="isLoading && loaderText">
      {{ loaderText }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

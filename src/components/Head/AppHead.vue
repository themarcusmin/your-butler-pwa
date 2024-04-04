<script setup lang="ts">
import { Head } from "@unhead/vue/components"

type HeadProps = {
  title?: string
  description?: string
}

defineProps<HeadProps>()

const defaultTitle = "Intent"
</script>

<template>
  <Head>
    <title>{{ title ? `${title} | ${defaultTitle}` : defaultTitle }}</title>
    <meta name="description" :content="description" />
  </Head>
</template>

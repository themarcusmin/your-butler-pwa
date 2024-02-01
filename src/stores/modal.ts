import { ref } from "vue"
import type { Component } from "vue"
import { defineStore } from "pinia"

interface ModalStorePayload {
  component: null | Component
  props?: object
}

const initialState: ModalStorePayload = {
  component: null,
  props: {}
}

export const useModalStore = defineStore("modal", () => {
  const modalState = ref(initialState)

  function openModal(payload: ModalStorePayload): void {
    const { component, props } = payload
    modalState.value = { component: component, props: props || {} }
  }

  function closeModal(): void {
    modalState.value = initialState
  }

  return { modalState, openModal, closeModal }
})

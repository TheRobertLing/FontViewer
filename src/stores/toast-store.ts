import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { toast as vueSonnerToast } from 'vue-sonner'

interface ToastItem {
  msg: string
  type: keyof Pick<typeof vueSonnerToast, 'success' | 'error'>
}

const useToastStore = defineStore('toast-store', () => {
  const toastStack = ref<ToastItem | null>(null)

  function toast(toastData: ToastItem) {
    toastStack.value = toastData
  }

  watch(toastStack, (newToast) => {
    if (newToast) {
      vueSonnerToast[newToast.type](newToast.msg)
      toastStack.value = null
    }
  })

  return { toastStack, toast }
})

export { useToastStore }

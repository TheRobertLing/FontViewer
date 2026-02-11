import { createEventHook, useDropZone, useFileDialog } from '@vueuse/core'
import { useToastStore } from '@/stores/toast-store'
import { ACCEPTED_FILE_TYPES, useFontLoader } from './font-loader'
import { computed, ref, type TemplateRef } from 'vue'

interface FontFileInfo {
  name: string
  size: number
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function useFontFileDialog() {
  const fileLoaded = createEventHook<File>()

  const { toast } = useToastStore()
  const { loadFontFile } = useFontLoader()

  const { open, onChange } = useFileDialog({
    accept: ACCEPTED_FILE_TYPES.join(),
    multiple: false,
  })

  onChange(async (fileList) => {
    if (!fileList?.length) return

    try {
      const file = fileList[0]!
      await loadFontFile(file)
      fileLoaded.trigger(file)
      toast({ msg: 'Font loaded successfully', type: 'success' })
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred'
      toast({ msg: errorMessage, type: 'error' })
    }
  })

  return { openFileDialog: open, onFileLoaded: fileLoaded.on }
}

function useFontFileDragNDrop(dropZoneEl: TemplateRef<HTMLElement>) {
  const fileLoaded = createEventHook<File>()

  const { toast } = useToastStore()
  const { loadFontFile } = useFontLoader()
  const { isOverDropZone } = useDropZone(dropZoneEl, async (files) => {
    if (!files?.length) {
      toast({ msg: 'No files selected', type: 'error' })
      return
    }

    try {
      const file = files[0]!
      await loadFontFile(file)
      fileLoaded.trigger(file)
      toast({ msg: 'Font loaded successfully', type: 'success' })
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred'
      toast({ msg: errorMessage, type: 'error' })
    }
  })

  return { isOverDropZone, onFileLoaded: fileLoaded.on }
}

function useFontFileLoaders(dropZoneEl: TemplateRef<HTMLElement>) {
  const fontFileInfo = ref<FontFileInfo | null>(null)

  const { openFileDialog, onFileLoaded: onDialogFileLoaded } = useFontFileDialog()
  const { isOverDropZone, onFileLoaded: onDropFileLoaded } = useFontFileDragNDrop(dropZoneEl)

  const formattedFileSize = computed(() => {
    if (!fontFileInfo.value) return null
    return formatFileSize(fontFileInfo.value.size)
  })

  const handleFileLoaded = (file: File) => {
    fontFileInfo.value = { name: file.name, size: file.size }
  }

  onDialogFileLoaded(handleFileLoaded)
  onDropFileLoaded(handleFileLoaded)

  return { openFileDialog, isOverDropZone, fontFileInfo, formattedFileSize }
}

export { useFontFileDialog, useFontFileDragNDrop, useFontFileLoaders }

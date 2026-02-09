import { useFontStore } from '@/stores/font-store'
import { parse as parseFontFile } from 'opentype.js'
import { storeToRefs } from 'pinia'
import decompress from 'woff2-encoder/decompress'

class UnsupportedFontFormatError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnsupportedFontFormatError'
  }
}

class FontParsingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FontParsingError'
  }
}

const ACCEPTED_FILE_TYPES = ['.ttf', '.otf', '.woff', '.woff2'] as const

function isValidFileType(file: File) {
  const name = file.name.toLowerCase()

  if (!ACCEPTED_FILE_TYPES.some((type) => name.endsWith(type))) {
    return false
  }

  return true
}

async function convertFontFileToBuffer(file: File) {
  const buffer = await file.arrayBuffer()

  if (file.name.endsWith('woff2')) {
    return await decompress(buffer)
  }

  return buffer
}

function useFontLoader() {
  const { font } = storeToRefs(useFontStore())

  const loadFontFile = async (file: File) => {
    if (!isValidFileType(file)) {
      throw new UnsupportedFontFormatError(
        `File format not supported. Accepted formats: ${ACCEPTED_FILE_TYPES.join(', ')}`,
      )
    }

    try {
      const buffer = await convertFontFileToBuffer(file)
      const parsed = parseFontFile(buffer)

      font.value = parsed
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      throw new FontParsingError('Error passing font file: ' + msg)
    }
  }

  return { loadFontFile }
}

export { ACCEPTED_FILE_TYPES, useFontLoader }

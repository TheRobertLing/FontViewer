import { useFontStore } from "@/stores/font-store";
import { storeToRefs } from "pinia";

function useGlyphInspector() {
  const { font } = storeToRefs(useFontStore())
}

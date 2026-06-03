<template>
  <section
    ref="containerRef"
    :style="{ height: `${scrollHeight}vh` }"
    class="relative"
  >
    <div class="sticky top-0 h-screen overflow-hidden">
      <video
        ref="videoRef"
        :src="slice.primary.video_url"
        muted
        playsinline
        preload="auto"
        class="w-full h-full object-cover"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  slice:   { type: Object, required: true },
  context: { type: Object },
  index:   { type: Number },
  slices:  { type: Array },
})

const scrollHeight = props.slice.primary.scroll_height || 300
const containerRef = ref(null)
const videoRef     = ref(null)

// Tall container + sticky inner: scrub the clip across the whole pinned scroll.
useScrubVideo(videoRef, containerRef, { start: 'top top', end: 'bottom bottom' })
</script>

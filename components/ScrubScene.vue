<template>
  <!-- Pinned scroll-scrub scene (mirrors earth-ai.com):
       a tall section holds a sticky, full-viewport video that stays pinned to
       the top as the background while the content slot scrolls up over it. The
       video's currentTime is scrubbed across the pinned scroll distance. When
       the section ends, the sticky releases and the next section enters. -->
  <section
    ref="rootRef"
    class="relative w-full bg-ea-navy"
    :style="{ height: `${scrollLength}vh` }"
  >
    <!-- Pinned background: scrubbed video (or static image fallback) -->
    <div class="sticky top-0 h-screen w-full overflow-hidden">
      <video
        v-if="videoUrl"
        ref="videoRef"
        :src="videoUrl"
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <img
        v-else-if="image && image.url"
        :src="image.url"
        :alt="image.alt || ''"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0" :class="overlayClass" />

      <!-- Decorative layers that should stay pinned with the video -->
      <slot name="pinned" />
    </div>

    <!-- Content layer: scrolls over the pinned background, then leaves with it -->
    <div class="absolute inset-0 z-10">
      <div class="h-screen w-full flex px-6 md:px-10" :class="alignClass">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  videoUrl:     { type: String, default: '' },
  image:        { type: Object, default: () => ({}) },
  // Total pinned scroll distance in vh. With 200, the video stays pinned for
  // ~one full screen of scroll, over which the content travels in and out.
  scrollLength: { type: Number, default: 200 },
  align:        { type: String, default: 'bottom' }, // 'top' | 'center' | 'bottom'
  overlayClass: { type: String, default: 'bg-ea-navy/40' },
})

const rootRef  = ref(null)
const videoRef = ref(null)

const alignClass = computed(() => ({
  top:    'items-start pt-28 md:pt-32',
  center: 'items-center',
  bottom: 'items-end pb-20 md:pb-28',
}[props.align] || 'items-end pb-20 md:pb-28'))

// Pinned scrub: map currentTime 0 → duration across the section's pinned travel
// (top hits viewport top → bottom hits viewport bottom), matching the sticky pin.
if (props.videoUrl) {
  useScrubVideo(videoRef, rootRef, { start: 'top top', end: 'bottom bottom' })
}
</script>

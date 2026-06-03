<template>
  <!-- variation: "overlay" — pinned full-bleed video; the headline scrolls over it -->
  <ScrubScene
    v-if="slice.variation === 'overlay'"
    :video-url="slice.primary.video_url || ''"
    :image="slice.primary.image || {}"
    :scroll-length="slice.primary.scroll_length || 200"
    :scrub-start="slice.primary.scrub_start || ''"
    align="bottom"
    overlay-class="bg-gradient-to-t from-ea-navy via-ea-navy/20 to-transparent"
  >
    <h2
      class="ea-display font-serif text-ea-cream text-4xl md:text-6xl font-normal leading-[1.05] max-w-2xl"
      v-html="slice.primary.title"
    />
  </ScrubScene>

  <!-- variation: "default" — media band with the headline set beneath it -->
  <section v-else ref="rootRef" class="relative w-full bg-ea-navy px-6 py-20 md:px-10 md:py-28">
    <div class="w-full overflow-hidden">
      <video
        v-if="slice.primary.video_url"
        ref="videoRef"
        :src="slice.primary.video_url"
        class="w-full h-[40vh] md:h-[55vh] object-cover"
        muted
        playsinline
        preload="metadata"
      />
      <img
        v-else-if="slice.primary.image?.url"
        :src="slice.primary.image.url"
        :alt="slice.primary.image.alt || ''"
        class="w-full h-[40vh] md:h-[55vh] object-cover"
      />
    </div>

    <div class="mt-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <!-- TODO: replace with PrismicRichText when Prismic is connected -->
      <h2
        class="ea-display font-serif text-ea-cream text-3xl md:text-5xl font-normal leading-[1.1] max-w-2xl"
        v-html="slice.primary.title"
      />
      <p
        v-if="slice.primary.body"
        class="text-ea-grey text-base leading-relaxed max-w-sm"
      >
        {{ slice.primary.body }}
      </p>
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

// Only used by the non-pinned "default" band variation.
const rootRef  = ref(null)
const videoRef = ref(null)

if (props.slice.variation !== 'overlay' && props.slice.primary.video_url) {
  // `scrub_start` ('top' | 'middle') is set per section in content/home.js.
  useScrubVideo(videoRef, rootRef, { startAt: props.slice.primary.scrub_start })
}
</script>

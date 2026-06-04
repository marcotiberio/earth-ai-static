<template>
  <ScrubScene
    :video-url="slice.primary.video_url || ''"
    :image="slice.primary.image || {}"
    :scroll-length="slice.primary.scroll_length || 200"
    :scrub-start="slice.primary.scrub_start || ''"
    align="bottom"
    overlay-class="bg-darkblue/40"
    eager
  >
    <!-- Content that scrolls over the pinned hero video -->
    <div class="w-full flex flex-col gap-8 md:flex-row md:items-end md:justify-start">
      <!-- TODO: replace with PrismicRichText when Prismic is connected -->
      <h1
        class="ea-display font-serif text-beige text-5xl md:text-8xl font-normal leading-[1.0] tracking-tight max-w-4xl"
        v-html="slice.primary.title"
      />
      <p
        v-if="slice.primary.subtitle"
        class="text-beige/85 text-base md:text-lg max-w-sm md:mb-3"
      >
        {{ slice.primary.subtitle }}
      </p>
    </div>
  </ScrubScene>
</template>

<script setup>
defineProps({
  slice:   { type: Object, required: true },
  context: { type: Object },
  index:   { type: Number },
  slices:  { type: Array },
})
</script>

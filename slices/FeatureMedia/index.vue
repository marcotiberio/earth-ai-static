<template>
  <!-- Pinned full-bleed targeting-map video; heading + body scroll over it -->
  <ScrubScene
    :video-url="slice.primary.video_url || ''"
    :image="slice.primary.image || {}"
    :scroll-length="slice.primary.scroll_length || 200"
    align="bottom"
    overlay-class="bg-gradient-to-t from-ea-navy via-ea-navy/50 to-transparent"
  >
    <div class="w-full flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <h2
        class="ea-display font-serif text-ea-cream text-3xl md:text-6xl font-normal leading-[1.08] max-w-2xl"
        v-html="slice.primary.heading"
      />
      <p
        v-if="slice.primary.body"
        class="text-ea-cream/80 text-base leading-relaxed max-w-md"
      >
        {{ slice.primary.body }}
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

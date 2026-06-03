<template>
  <ScrubScene
    :video-url="slice.primary.video_url || ''"
    :image="slice.primary.image || {}"
    :scroll-length="slice.primary.scroll_length || 200"
    align="bottom"
    overlay-class="bg-ea-navy/40"
  >
    <!-- Pinned decorative layers (dotted grid + tick markers) -->
    <template #pinned>
      <div class="pointer-events-none absolute inset-x-6 md:inset-x-10 top-[27%] bottom-[14%] flex flex-col justify-between">
        <hr v-for="n in 4" :key="n" class="ea-rule" />
      </div>
      <span
        v-for="(m, i) in slice.primary.markers || []"
        :key="`marker-${i}`"
        class="absolute flex items-start gap-1 text-[11px] tracking-widest text-ea-cream/70"
        :style="{ left: m.x, top: m.y }"
      >
        <span class="leading-none">+</span>
        <span class="[writing-mode:vertical-rl] rotate-180">{{ m.value }}</span>
      </span>
    </template>

    <!-- Content that scrolls over the pinned hero video -->
    <div class="w-full flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <!-- TODO: replace with PrismicRichText when Prismic is connected -->
      <h1
        class="ea-display font-serif text-ea-cream text-5xl md:text-8xl font-normal leading-[1.0] tracking-tight max-w-4xl"
        v-html="slice.primary.title"
      />
      <p
        v-if="slice.primary.subtitle"
        class="text-ea-cream/85 text-base md:text-lg max-w-sm md:mb-3"
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

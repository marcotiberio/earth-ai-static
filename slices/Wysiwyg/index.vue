<template>
  <section class="bg-darkblue px-6 py-28 md:px-10 md:py-40">
    <!-- variation: "statement" — oversized editorial pull-statement -->
    <div
      v-if="slice.variation === 'statement'"
      class="ea-display font-serif text-beige text-4xl md:text-7xl font-normal leading-[1.08] tracking-tight max-w-5xl"
      v-html="slice.primary.content"
    />

    <!-- variation: "default" — running prose -->
    <div
      v-else
      class="wysiwyg max-w-3xl text-beige text-xl md:text-2xl leading-relaxed"
      v-html="slice.primary.content"
    />
  </section>
</template>

<script setup>
defineProps({
  slice:   { type: Object, required: true },
  context: { type: Object },
  index:   { type: Number },
  slices:  { type: Array },
})
</script>

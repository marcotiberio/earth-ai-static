<template>
  <div
    v-for="(slice, i) in slices"
    :key="`${slice.slice_type}-${i}`"
    :id="`${slice.slice_type}-${i}`"
  >
    <component
      :is="components[slice.slice_type]"
      :slice="slice"
      :index="i"
      :slices="slices"
    />
  </div>
</template>

<script setup>
defineProps({
  slices:     { type: Array,  required: true },
  components: { type: Object, required: true },
})
</script>

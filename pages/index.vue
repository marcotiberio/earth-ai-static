<template>
  <main>
    <SliceZone :slices="page.data.slices" :components="components" />
  </main>
</template>

<script setup>
import { components } from '~/slices'
import { homePage }   from '~/content/home.js'

// TODO: replace with Prismic fetch after handover
// const prismic = usePrismic()
// const { data: page } = await useAsyncData('home', () =>
//   prismic.client.getSingle('home_page')
// )

const page = homePage

useSeoMeta({
  title:       page.data.meta_title,
  description: page.data.meta_description,
})
</script>

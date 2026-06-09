<template>
  <main>
    <SliceZone v-if="page" :slices="visibleSlices(page.data.slices)" :components="components" />
  </main>
</template>

<script setup>
import { components } from '~/slices'

// Fetch the published `home_page` single type from Prismic. Only slices that
// have been modeled, pushed, and added to the document will render here.
const prismic = usePrismic()
const { data: page } = await useAsyncData('home_page', () =>
  prismic.client.getSingle('home_page').catch(() => null),
)

// Build absolute URLs (Open Graph requires them) from the configured site URL.
const { public: { siteUrl } } = useRuntimeConfig()
const route = useRoute()
const canonical = computed(() => new URL(route.path, siteUrl).href)

const title       = computed(() => page.value?.data.meta_title || 'Earth AI')
const description = computed(() => page.value?.data.meta_description || '')

// Social share image: the Prismic `meta_image` field if set, else the hero.
const ogImage = computed(() => {
  const field = page.value?.data.meta_image
  const src = field?.url || '/images/EAI_Landscape-Hero.jpg'
  return new URL(src, siteUrl).href
})
const ogImageAlt = computed(
  () => page.value?.data.meta_image?.alt || 'Earth AI',
)
// Prismic images expose their own dimensions; fall back to the hero's 1920×1080.
const ogImageWidth  = computed(() => page.value?.data.meta_image?.dimensions?.width  || 1920)
const ogImageHeight = computed(() => page.value?.data.meta_image?.dimensions?.height || 1080)

useSeoMeta({
  title,
  description,

  // Open Graph
  ogTitle:       title,
  ogDescription: description,
  ogUrl:         canonical,
  ogImage:       ogImage,
  ogImageWidth:  ogImageWidth,
  ogImageHeight: ogImageHeight,
  ogImageAlt:    ogImageAlt,

  // Twitter
  twitterTitle:       title,
  twitterDescription: description,
  twitterImage:       ogImage,
  twitterImageAlt:    ogImageAlt,
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})
</script>

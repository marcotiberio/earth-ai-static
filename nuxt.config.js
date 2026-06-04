// https://nuxt.com/docs/api/configuration/nuxt-config
import { apiEndpoint, repositoryName } from './slicemachine.config.json'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/prismic'],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
  },

  devServer: { port: 3000 },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [// '@nuxtjs/prismic', // reconnect after handover session
  '@nuxtjs/tailwindcss', "@nuxtjs/prismic"],

  // prismic: {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   clientConfig: { accessToken: process.env.PRISMIC_ACCESS_TOKEN },
  // },

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
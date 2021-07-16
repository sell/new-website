export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Jay Codes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An aspiring Web Dev and Bot Dev. Also, spend time helping others.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://media.discordapp.net/attachments/854927794571575316/864610625149730856/rect4s0ff24.png' },
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' },
    ],
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss',
    'boxicons/css/boxicons.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
  ],

  http: {
    baseURL: process.env.isDev ? '' : 'https://jay-codes.onrender.com/'
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api',
  },

  /*
  ** For deployment you might want to edit host and port
  */
  server: {
   // port: 8000, // default: 3000
   host: !process.env.isDev ? '0.0.0.0' : 'localhost' // default: localhost
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
};

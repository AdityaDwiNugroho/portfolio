export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'simple.portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/initializeDarkMode.js'
  ],
  compatibilityDate: '2024-07-27',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // '@pinia/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          img: 'src',
          image: 'xlink:href',
          // Add custom tags and attributes
          'custom-img': ['src'],
        },
      },
    },
  },

  // Additional modules
  modules: [
    // Include other modules you are using
  ],
}
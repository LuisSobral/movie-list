export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Luis' Movies List",
    htmlAttrs: {
      lang: 'pt-BR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/api', '~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
    // https://google-fonts.nuxtjs.org/setup
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
  ],

  // Style Resources module configuration: https://github.com/nuxt-community/style-resources-module
  styleResources: {
    hoistUseStatements: true,
    scss: ['~/assets/style/_variables.scss', '~/assets/style/_mixins.scss'],
  },

  // Google Fonts module configuration: https://google-fonts.nuxtjs.org/setup
  googleFonts: {
    families: {
      Raleway: [400, 500, 600, 700, 800],
      'Fira Sans': [400, 600],
    },
  },

  // Font Awesome module configuration: https://github.com/nuxt-community/fontawesome-module
  fontawesome: {
    icons: {
      solid: [
        'faSearch',
        'faHeart',
        'faStar',
        'faChevronRight',
        'faTimes',
        'faPlay',
        'faArrowLeft',
        'faShareSquare',
        'faHome',
        'faTicketAlt'
      ],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.themoviedb.org/3/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Global public environment variables: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
  publicRuntimeConfig: {
    apiKey: process.env.TMDB_KEY || '',
  },
}

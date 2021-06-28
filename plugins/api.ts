import { Plugin } from '@nuxt/types'
import { Repositories } from '~/api'
import { InterfaceApi } from '~/types/InterfaceApi'

let $api: InterfaceApi

declare module 'vue/types/vue' {
  interface Vue {
    $api: InterfaceApi
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: InterfaceApi
  }

  interface Context {
    $api: InterfaceApi
  }
}

const apiPlugin: Plugin = ({ $axios }, inject) => {
  const api = {
    $repositories: Repositories($axios),
  }

  $api = api
  inject('api', api)
}

export { $api }
export default apiPlugin

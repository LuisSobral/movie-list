import { Plugin } from '@nuxt/types'
import { Repositories } from '~/api'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      $repositories: any
      $baseImageURL: string
    }
  }
}

const apiPlugin: Plugin = ({ $axios }, inject) => {
  const api = {
    $baseImageURL: '',
    $repositories: Repositories($axios),
  }

  inject('api', api)
}

export default apiPlugin

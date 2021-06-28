import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceResponseNowPlaying } from '~/types/InterfaceApi'

export default ($axios: NuxtAxiosInstance) => ({
  async nowPlaying(): Promise<InterfaceResponseNowPlaying | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/now_playing?language=pt-BR')
    } catch (failure) {
      return []
    }
  },
})

import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceMoviesResponse } from '~/types/InterfaceApi'

export default ($axios: NuxtAxiosInstance) => ({
  async nowPlaying(): Promise<InterfaceMoviesResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/now_playing?language=pt-BR')
    } catch (failure) {
      return []
    }
  },

  async popular(): Promise<InterfaceMoviesResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/popular?language=pt-BR&region=BR')
    } catch (failure) {
      return []
    }
  },

  async topRated(): Promise<InterfaceMoviesResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/top_rated?language=pt-BR&region=BR')
    } catch (failure) {
      return []
    }
  },
})

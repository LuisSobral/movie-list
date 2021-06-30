import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceResponse } from '~/types/InterfaceApi'
import { InterfaceMovie } from '~/types/InterfaceMovie'

export default ($axios: NuxtAxiosInstance) => ({
  async list(): Promise<InterfaceResponse | InterfaceGenre[]> {
    try {
      return await $axios.$get('genre/movie/list?language=pt-BR')
    } catch (failure) {
      return []
    }
  },

  async moviesGenre(id: number): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get(
        `discover/movie?language=pt-BR&with_genres=${id}`
      )
    } catch (failure) {
      return []
    }
  },
})

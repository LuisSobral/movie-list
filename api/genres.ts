import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceResponseMoviesGenres } from '~/types/InterfaceApi'

export default ($axios: NuxtAxiosInstance) => ({
  async list(): Promise<InterfaceResponseMoviesGenres | InterfaceGenre[]> {
    try {
      return await $axios.$get('genre/movie/list?language=pt-BR')
    } catch (failure) {
      return []
    }
  },
})

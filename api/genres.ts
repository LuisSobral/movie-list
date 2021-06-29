import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMoviesGenresResponse } from '~/types/InterfaceApi'

export default ($axios: NuxtAxiosInstance) => ({
  async list(): Promise<InterfaceMoviesGenresResponse | InterfaceGenre[]> {
    try {
      return await $axios.$get('genre/movie/list?language=pt-BR')
    } catch (failure) {
      return []
    }
  },
})

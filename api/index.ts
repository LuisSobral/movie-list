import { NuxtAxiosInstance } from '@nuxtjs/axios'
import MoviesRepository from './movies'

const Repositories = ($axios: NuxtAxiosInstance) => ({
  movies: MoviesRepository($axios),
})

export { Repositories }

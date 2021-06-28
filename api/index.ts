import { NuxtAxiosInstance } from '@nuxtjs/axios'

import GenresRepository from './genres'
import MoviesRepository from './movies'

const Repositories = ($axios: NuxtAxiosInstance) => ({
  genres: GenresRepository($axios),
  movies: MoviesRepository($axios),
})

export { Repositories }

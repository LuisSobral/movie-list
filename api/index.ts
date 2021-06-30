import { NuxtAxiosInstance } from '@nuxtjs/axios'

import GenresRepository from './genres'
import MoviesRepository from './movies'
import PeopleRepository from './people'

const Repositories = ($axios: NuxtAxiosInstance) => ({
  genres: GenresRepository($axios),
  movies: MoviesRepository($axios),
  people: PeopleRepository($axios),
})

export { Repositories }

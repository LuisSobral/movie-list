import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceResponse } from '~/types/InterfaceApi'

@Module({
  name: 'movies',
  namespaced: true,
  stateFactory: true,
})
export default class MoviesModule extends VuexModule {
  latest: InterfaceMovie = {}
  nowPlayingMovies: InterfaceMovie[] = []
  popularMovies: InterfaceMovie[] = []
  topRatedMovies: InterfaceMovie[] = []

  @MutationAction
  async fetchLatest(): Promise<{
    latest: InterfaceMovie
  }> {
    const response = await $api.$repositories.movies.movie(299534)
    return {
      latest: response,
    }
  }

  @MutationAction
  async fetchNowPlayingMovies(): Promise<{
    nowPlayingMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.nowPlaying()
    return {
      nowPlayingMovies: ((response as InterfaceResponse).results ||
        response) as InterfaceMovie[],
    }
  }

  @MutationAction
  async fetchPopularMovies(): Promise<{
    popularMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.popular()
    return {
      popularMovies: ((response as InterfaceResponse).results ||
        response) as InterfaceMovie[],
    }
  }

  @MutationAction
  async fetchTopRatedMovies(): Promise<{
    topRatedMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.topRated()
    return {
      topRatedMovies: ((response as InterfaceResponse).results ||
        response) as InterfaceMovie[],
    }
  }
}

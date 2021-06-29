import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceMoviesResponse } from '~/types/InterfaceApi'

@Module({
  name: 'movies',
  namespaced: true,
  stateFactory: true,
})
export default class MoviesModule extends VuexModule {
  nowPlayingMovies: InterfaceMovie[] = []
  popularMovies: InterfaceMovie[] = []
  topRatedMovies: InterfaceMovie[] = []

  @MutationAction
  async fetchNowPlayingMovies(): Promise<{
    nowPlayingMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.nowPlaying()
    return {
      nowPlayingMovies:
        (response as InterfaceMoviesResponse).results || response,
    }
  }

  @MutationAction
  async fetchPopularMovies(): Promise<{
    popularMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.popular()
    return {
      popularMovies: (response as InterfaceMoviesResponse).results || response,
    }
  }

  @MutationAction
  async fetchTopRatedMovies(): Promise<{
    topRatedMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.topRated()
    return {
      topRatedMovies: (response as InterfaceMoviesResponse).results || response,
    }
  }
}

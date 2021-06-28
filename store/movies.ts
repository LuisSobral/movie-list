import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceResponseNowPlaying } from '~/types/InterfaceApi'

@Module({
  name: 'movies',
  namespaced: true,
  stateFactory: true,
})
export default class MoviesModule extends VuexModule {
  nowPlayingMovies: InterfaceMovie[] = []

  @MutationAction
  async fetchNowPlayingMovies(): Promise<{
    nowPlayingMovies: InterfaceMovie[]
  }> {
    const response = await $api.$repositories.movies.nowPlaying()
    return {
      nowPlayingMovies:
        (response as InterfaceResponseNowPlaying).results || response,
    }
  }
}

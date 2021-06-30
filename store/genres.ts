import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceResponse } from '~/types/InterfaceApi'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Module({
  name: 'genres',
  namespaced: true,
  stateFactory: true,
})
export default class GenresModule extends VuexModule {
  genres: InterfaceGenre[] = []
  movieGenre: InterfaceMovie = {}

  @MutationAction
  async fetchGenres(): Promise<{
    genres: InterfaceGenre[]
  }> {
    const response = await $api.$repositories.genres.list()
    return {
      genres: ((response as InterfaceResponse).genres ||
        response) as InterfaceGenre[],
    }
  }
}

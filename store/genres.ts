import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMoviesGenresResponse } from '~/types/InterfaceApi'

@Module({
  name: 'genres',
  namespaced: true,
  stateFactory: true,
})
export default class GenresModule extends VuexModule {
  genres: InterfaceGenre[] = []

  @MutationAction
  async fetchGenres(): Promise<{
    genres: InterfaceGenre[]
  }> {
    const response = await $api.$repositories.genres.list()
    return {
      genres: (response as InterfaceMoviesGenresResponse).genres || response,
    }
  }
}

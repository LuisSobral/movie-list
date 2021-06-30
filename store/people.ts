import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'

import { $api } from '~/plugins/api'
import { InterfacePeople } from '~/types/InterfacePeople'
import { InterfaceResponse } from '~/types/InterfaceApi'

@Module({
  name: 'people',
  namespaced: true,
  stateFactory: true,
})
export default class PeopleModule extends VuexModule {
  popular: InterfacePeople[] = []

  @MutationAction
  async fetchPopular(): Promise<{
    popular: InterfacePeople[]
  }> {
    const response = await $api.$repositories.people.popular()
    return {
      popular: ((response as InterfaceResponse).results ||
        response) as InterfacePeople[],
    }
  }
}

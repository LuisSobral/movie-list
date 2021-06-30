import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfacePeople } from '~/types/InterfacePeople'
import { InterfaceResponse } from '~/types/InterfaceApi'

export default ($axios: NuxtAxiosInstance) => ({
  async popular(): Promise<InterfaceResponse | InterfacePeople[]> {
    try {
      return await $axios.$get('person/popular?language=pt-BR')
    } catch (failure) {
      return []
    }
  },
})

import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default ($axios: NuxtAxiosInstance) => ({
  async nowPlaying() {
    try {
      return await $axios.$get('movie/now_playing?language=pt-BR')
    } catch (error) {
      return error.response?.data.status_message
    }
  },
})

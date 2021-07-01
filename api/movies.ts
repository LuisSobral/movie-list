import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceResponse } from '~/types/InterfaceApi'

const formatDate = function (date: Date) {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  return `${year}-${month}-${day}`
}

export default ($axios: NuxtAxiosInstance) => ({
  async movie(id: number, querys?: string): Promise<InterfaceMovie> {
    try {
      let append: string = ''

      if (querys) {
        append = `append_to_response=${querys}`
      }
      return await $axios.$get(`movie/${id}?language=pt-BR&${append}`)
    } catch (failure) {
      return {}
    }
  },

  async nowPlaying(): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/now_playing?language=pt-BR')
    } catch (failure) {
      return []
    }
  },

  async popular(): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/popular?language=pt-BR&region=BR')
    } catch (failure) {
      return []
    }
  },

  async topRated(): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get('movie/top_rated?language=pt-BR&region=BR')
    } catch (failure) {
      return []
    }
  },

  async nextReleases(
    minDate: Date,
    maxDate: Date
  ): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      const min: string = formatDate(minDate)
      const max: string = formatDate(maxDate)
      return await $axios.$get(
        `discover/movie?language=pt-BR&sort_by=primary_release_date.asc&primary_release_date.gte=${min}&primary_release_date.lte=${max}`
      )
    } catch (failure) {
      return []
    }
  },

  async makeSearch(
    query: string
  ): Promise<InterfaceResponse | InterfaceMovie[]> {
    try {
      return await $axios.$get(
        `search/movie?language=pt-BR&query=${encodeURIComponent(query)}`
      )
    } catch (failure) {
      return []
    }
  },
})

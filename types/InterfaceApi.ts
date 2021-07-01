import { InterfaceGenre } from './InterfaceGenre'
import { InterfaceMovie } from './InterfaceMovie'
import { InterfacePeople } from './InterfacePeople'

interface InterfaceResponse {
  page?: number
  results: InterfaceMovie[] | InterfacePeople[]
  dates?: {
    maximum: string
    minimum: string
  }
  total_pages?: number
  total_results?: number
  genres?: InterfaceGenre[]
}

interface InterfaceApi {
  $repositories: {
    movies: {
      movie(id: number, querys?: string): Promise<InterfaceMovie>
      nowPlaying(): Promise<InterfaceResponse | InterfaceMovie[]>
      popular(): Promise<InterfaceResponse | InterfaceMovie[]>
      topRated(): Promise<InterfaceResponse | InterfaceMovie[]>
      nextReleases(
        minDate: Date,
        maxDate: Date
      ): Promise<InterfaceResponse | InterfaceMovie[]>
      makeSearch(query: string): Promise<InterfaceResponse | InterfaceMovie[]>
    }

    genres: {
      list(): Promise<InterfaceResponse | InterfaceGenre[]>
      moviesGenre(id: number): Promise<InterfaceResponse | InterfaceMovie[]>
    }

    people: {
      popular(): Promise<InterfaceResponse | InterfacePeople[]>
    }
  }
}

export { InterfaceApi, InterfaceResponse }

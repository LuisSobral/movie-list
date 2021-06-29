import { InterfaceGenre } from './InterfaceGenre'
import { InterfaceMovie } from './InterfaceMovie'

interface InterfaceMoviesResponse {
  page?: number
  results: InterfaceMovie[]
  dates?: {
    maximum: string
    minimum: string
  }
  total_pages?: number
  total_results?: number
}

interface InterfaceMoviesGenresResponse {
  genres: InterfaceGenre[]
}

interface InterfaceApi {
  $repositories: {
    movies: {
      nowPlaying(): Promise<InterfaceMoviesResponse | InterfaceMovie[]>
      popular(): Promise<InterfaceMoviesResponse | InterfaceMovie[]>
      topRated(): Promise<InterfaceMoviesResponse | InterfaceMovie[]>
    }

    genres: {
      list(): Promise<InterfaceMoviesGenresResponse | InterfaceGenre[]>
    }
  }
}

export { InterfaceApi, InterfaceMoviesResponse, InterfaceMoviesGenresResponse }

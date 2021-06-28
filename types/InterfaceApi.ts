import { InterfaceGenre } from './InterfaceGenre'
import { InterfaceMovie } from './InterfaceMovie'

interface InterfaceResponseNowPlaying {
  page: number
  results: InterfaceMovie[]
  dates: {
    maximum: string
    minimum: string
  }
  totalPages: number
  totalResults: number
}

interface InterfaceResponseMoviesGenres {
  genres: InterfaceGenre[]
}

interface InterfaceApi {
  $repositories: {
    movies: {
      nowPlaying(): Promise<InterfaceResponseNowPlaying | InterfaceMovie[]>
    }

    genres: {
      list(): Promise<InterfaceResponseMoviesGenres | InterfaceGenre[]>
    }
  }
}

export {
  InterfaceApi,
  InterfaceResponseNowPlaying,
  InterfaceResponseMoviesGenres,
}

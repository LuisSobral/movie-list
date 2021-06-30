import { InterfaceGenre } from './InterfaceGenre'

interface InterfaceMovie {
  poster_path?: string | null
  genre_ids?: number[]
  genres?: InterfaceGenre[]
  id?: string
  title?: string
  backdrop_path?: string | null
  popularity?: number
  vote_average?: number
  release_date?: string
  overview?: string
}

export { InterfaceMovie }

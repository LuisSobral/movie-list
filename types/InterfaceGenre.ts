import { InterfaceMovie } from './InterfaceMovie'

interface InterfaceGenre {
  id?: number
  name?: string
  movies?: InterfaceMovie[]
}

export { InterfaceGenre }

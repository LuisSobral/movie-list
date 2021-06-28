import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'

import GenresStore from '~/store/genres'
import MoviesStore from '~/store/movies'

let genresStore: GenresStore
let moviesStore: MoviesStore

function initialiseStores(store: Store<any>): void {
  genresStore = getModule(GenresStore, store)
  moviesStore = getModule(MoviesStore, store)
}

export { initialiseStores, genresStore, moviesStore }

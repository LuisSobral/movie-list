import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'

import GenresStore from '~/store/genres'
import MoviesStore from '~/store/movies'
import PeopleStore from '~/store/people'

let genresStore: GenresStore
let moviesStore: MoviesStore
let peopleStore: PeopleStore

function initialiseStores(store: Store<any>): void {
  genresStore = getModule(GenresStore, store)
  moviesStore = getModule(MoviesStore, store)
  peopleStore = getModule(PeopleStore, store)
}

export { initialiseStores, genresStore, moviesStore, peopleStore }

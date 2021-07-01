<template>
  <div class="mt-12 text-center">
    <LayoutSearchInput class="block lg:none" @change="makeSearch" />
    <div class="mt-8 text-left px-8">
      <h3 class="weight-bold mb-5">Resultados</h3>
      <div class="grid grid-columns-1 md:grid-columns-2 lg:grid-columns-3 grid-gap-20">
        <nuxt-link
          v-for="movie in searchResults"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
        >
          <div class="card grid grid-columns-6">
            <div
              class="background-cover background-center grid-span-2"
              :style="{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
              }"
            />
            <div
              class="
                card__info
                flex flex-column
                justify-center
                grid-span-4
                px-4
              "
            >
              <h5 class="weight-semibold text-lg mb-1">
                {{ movie.title }}
                <span v-if="movie.release_date"
                  >({{ new Date(movie.release_date).getFullYear() }})</span
                >
              </h5>
              <p class="card__info__genres weight-medium text-sm mb-3">
                <span
                  v-for="(genre, index) in setGenres(movie)"
                  :key="genre.id"
                >
                  {{ genre.name
                  }}<span v-if="index < setGenres(movie).length - 1">, </span>
                </span>
              </p>
              <span class="card__info__popularity inline-block text-sm mb-3">
                <font-awesome-icon :icon="['fas', 'heart']" />
                <span class="inline-block ml-2 weight-bold">{{
                  movie.popularity
                }}</span>
              </span>
              <p
                v-if="movie.overview"
                class="card__info__overview relative weight-normal text-xs pb-4"
              >
                {{ movie.overview }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { genresStore } from '~/store'
import { InterfaceResponse } from '~/types/InterfaceApi'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component
export default class BuscaPage extends Vue {
  searchResults: InterfaceMovie[] = []

  async fetch() {
    if (genresStore.genres.length === 0) {
      await genresStore.fetchGenres()
    }
  }

  async makeSearch(query: string) {
    const response = await this.$api.$repositories.movies.makeSearch(query)
    this.searchResults =
      ((response as InterfaceResponse).results as InterfaceMovie[]) || response
  }

  setGenres(movie: InterfaceMovie) {
    const genres: InterfaceGenre[] = []

    movie.genre_ids?.forEach((id) => {
      const genre = genresStore.genres.find((genre) => genre.id === id)
      genres.push(genre as InterfaceGenre)
    })

    return genres
  }

  @Watch('$route.query.search', { immediate: true })
  hasQuery() {
    if (this.$route.query.search) {
      this.makeSearch(this.$route.query.search as string)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.card {
  border-radius: 6px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05);
  color: $important-color;
  height: 160px;
  overflow: hidden;

  > div {
    &:first-child {
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
    }

    &:last-child {
      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
    }
  }

  &__info__genres {
    color: $color-grey-text;
    mix-blend-mode: normal;
    opacity: $opacity-text;
  }

  &__info__popularity {
    svg {
      color: $color-heart;
    }

    span {
      color: #677b98;
      font-feature-settings: 'pnum' on, 'lnum' on;
    }
  }

  &__info__overview {
    color: $color-grey-text;
    line-height: 17px;
    max-height: 48px;
    min-height: 48px;
    overflow: hidden;
  }

  @media screen and (min-width: 640px) {
    height: 210px;
  }
}
</style>

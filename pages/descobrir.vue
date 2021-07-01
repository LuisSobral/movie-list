<template>
  <div class="container mx-auto pl-8 xl:pl-0">
    <h1 class="mt-16 weigth-bold text-4xl">Descborir</h1>
    <LayoutSectionList
      title="Adicionados recentemente"
      title-font-size="sm:text-xl"
      additional-text-font-size="text-sm sm:text-xs"
      :has-icon="false"
    >
      <PagesCarouselList :items="popularMovies" :items-per-slide="4">
        <template slot-scope="{ item }">
          <PagesCardMovie
            :movie="item"
            :poster="true"
            :hover-effect="false"
            :show-name="true"
          />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <LayoutSectionList
      title="Atores mais vistos"
      title-font-size="sm:text-xl"
      additional-text-font-size="text-sm sm:text-xs"
      :has-icon="false"
    >
      <PagesCarouselList :items="popularActors" :items-per-slide="6" :items-per-slide-md="8">
        <template slot-scope="{ item }">
          <PagesPeopleAvatar
            :size="80"
            :image="`https://image.tmdb.org/t/p/original${item.profile_path}`"
          />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <LayoutSectionList
      title="Gêneros"
      title-font-size="sm:text-xl"
      additional-text-font-size="text-sm sm:text-xs"
      :has-icon="false"
    >
      <PagesCarouselList
        class="carousel__genre"
        :items="genres"
        :items-per-slide="5"
        :items-per-slide-md="5"
      >
        <template slot-scope="{ item }">
          <div
            class="
              genre
              relative
              flex
              items-center
              justify-center
              text-center
              background-cover background-center
              sm:w-auto
            "
            :style="{
              backgroundImage: item.movies[0]
                ? `url(https://image.tmdb.org/t/p/original${item.movies[0].backdrop_path})`
                : '',
            }"
          >
            <div class="genre__overlay absolute placement-x-0 placement-y-0" />
            <span class="weight-bold">{{ item.name }}</span>
          </div>
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <h4 class="weight-bold text-xl sm:text-3xl my-10">Próximos lançamentos</h4>
    <LayoutSectionList
      v-for="(release, index) in futureReleases"
      :key="index"
      :title="`${release.month} (${release.total})`"
      title-font-size="sm:text-xl"
      additional-text-font-size="text-sm sm:text-xs"
      :has-icon="false"
    >
      <PagesCarouselList :items="release.movies" :items-per-slide="4">
        <template slot-scope="{ item }">
          <PagesCardMovie :movie="item" :poster="true" :hover-effect="false" />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { genresStore, moviesStore, peopleStore } from '~/store'
import { InterfaceResponse } from '~/types/InterfaceApi'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfacePeople } from '~/types/InterfacePeople'

@Component
export default class DescobrirPage extends Vue {
  futureReleases: Array<object> = []
  genres: InterfaceGenre[] = genresStore.genres
  popularActors: InterfacePeople[] = peopleStore.popular
  popularMovies: InterfaceMovie[] = moviesStore.popularMovies

  async fetch() {
    if (this.genres.length === 0) {
      await genresStore.fetchGenres()
      this.genres = genresStore.genres

      this.genres.forEach(async (genre) => {
        if (!genre.movies) {
          genre.movies = []
        }

        const response = await this.$api.$repositories.genres.moviesGenre(
          genre.id as number
        )
        const results = (response as InterfaceResponse).results || []
        const movie =
          results.length > 0
            ? results[Math.floor(Math.random() * results.length)]
            : {}
        genre.movies.push(movie as InterfaceMovie)
      })
    }

    if (this.popularMovies.length === 0) {
      await moviesStore.fetchPopularMovies()
      this.popularMovies = moviesStore.popularMovies
    }

    if (this.popularActors.length === 0) {
      await peopleStore.fetchPopular()
      this.popularActors = peopleStore.popular
    }

    const today = new Date()
    const lastDayThisMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    )
    await this.setFutureReleases(today, lastDayThisMonth, 0)
  }

  async setFutureReleases(minDate: Date, maxDate: Date, indexMonth: number) {
    if (indexMonth === 3) {
      return
    }

    this.futureReleases.push(await this.nextReleases(minDate, maxDate))
    await this.setFutureReleases(
      new Date(minDate.getFullYear(), minDate.getMonth() + 1, 1),
      new Date(minDate.getFullYear(), minDate.getMonth() + 2, 0),
      ++indexMonth
    )
  }

  async nextReleases(minDate: Date, maxDate: Date) {
    const releasesMonth: {
      total: number
      movies: InterfaceMovie[]
      month: string
    } = { total: 0, movies: [], month: '' }
    const response = await this.$api.$repositories.movies.nextReleases(
      minDate,
      maxDate
    )

    if (typeof response === 'object') {
      releasesMonth.month = this.capitalizeFirstLetter(
        minDate.toLocaleString('pt-br', { month: 'long' })
      )
      releasesMonth.total = (response as InterfaceResponse).total_results
        ? ((response as InterfaceResponse).total_results as number)
        : 0
      releasesMonth.movies = (response as InterfaceResponse).results
        ? ((response as InterfaceResponse).results as InterfaceMovie[])
        : []
    }

    return releasesMonth
  }

  capitalizeFirstLetter(month: string) {
    return month.charAt(0).toUpperCase() + month.slice(1)
  }
}
</script>

<style lang="scss" scoped>
.genre {
  border-radius: 10px;
  color: $color-white !important;
  height: 120px;
  width: 120px;

  @media screen and (min-width: 640px) {
    height: 100px;
    width: 100px;
  }

  @media screen and (min-width: 768px) {
    height: 120px;
    width: 120px;
  }

  > span {
    z-index: 10;
  }

  &__overlay {
    background: #000;
    border-radius: 10px;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05);
    mix-blend-mode: normal;
    opacity: 0.5;
  }
}

.carousel {
  &__genre {
    ::v-deep .carousel {
      @media screen and (min-width: 640px) {
        &__wrapper {
          flex-wrap: wrap;
        }

        &__slides {
          padding-bottom: 8px !important;
          padding-top: 8px !important;
        }
      }
    }
  }
}
</style>

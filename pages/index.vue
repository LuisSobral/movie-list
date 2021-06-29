<template>
  <div>
    <section
      class="banner relative"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          isMobile ? principalMovie.poster_path : principalMovie.backdrop_path
        }`,
      }"
    >
      <div
        class="
          banner__content
          container
          absolute
          flex flex-column
          justify-evenly
          sm:justify-center
          h-full
          placement-x-0
          mx-auto
          pa-8
          sm:py-0 sm:px-4
        "
      >
        <div class="banner__content__text sm:mb-8">
          <h1
            class="
              weight-extrabold
              text-3xl
              sm:text-4xl
              line-height-3xl
              sm:line-height-3xl
              mb-2
              sm:mb-3
            "
          >
            O cinema na suas mãos
          </h1>
          <p class="sm:text-lg line-height-xl">
            Filmes adicionados e selecionados<br />exclusivamente para você
          </p>
        </div>
        <div class="banner__content__movie sm:relative">
          <div
            class="banner__content__movie__poster"
            :style="{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                isMobile
                  ? principalMovie.poster_path
                  : principalMovie.backdrop_path
              }`,
            }"
          />
          <div
            class="
              banner__content__movie__info
              sm:absolute sm:bottom-10
              mt-3
              sm:mt-0 sm:ml-12
            "
          >
            <h2
              class="
                text-sm
                sm:text-3xl
                line-height-lg
                sm:line-height-4xl
                weight-semibold
                sm:weight-medium
                mb-1
              "
            >
              {{ principalMovie.title }}
            </h2>
            <p
              class="
                text-xs
                sm:text-sm
                line-height-xs
                sm:line-height-sm
                weight-medium
                mt-2
                sm:mt-0
              "
            >
              <span v-for="(genre, index) in principalGenres" :key="genre.id">
                {{ genre.name
                }}<span v-if="index < principalGenres.length - 1">, </span>
              </span>
            </p>
          </div>
          <div
            class="
              banner__content__movie__overlay
              none
              sm:block sm:absolute sm:h-half sm:bottom-0 sm:left-0 sm:right-0
            "
          />
        </div>
      </div>
    </section>
    <section class="container mt-12 pl-8 sm:mx-auto sm:px-4">
      <h2 class="mb-7 text-2xl line-height-xl weight-bold">Os mais amados</h2>
      <PagesCarouselMovies :movies="popularMovies">
        <template slot-scope="{ item }">
          <PagesCardMovie :heart="true" :movie="item" :poster="isMobile" />
        </template>
      </PagesCarouselMovies>
    </section>
    <section class="container mt-12 pl-8 sm:mx-auto sm:px-4">
      <h2 class="mb-7 text-2xl line-height-xl weight-bold">
        Os melhores avaliados
      </h2>
      <PagesCarouselMovies :movies="topRatedMovies">
        <template slot-scope="{ item }">
          <PagesCardMovie :star="true" :movie="item" :poster="isMobile" />
        </template>
      </PagesCarouselMovies>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { genresStore, moviesStore } from '~/store'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component
export default class HomePage extends Vue {
  isMobile: boolean = true
  principalMovie: InterfaceMovie = {}
  principalGenres: InterfaceGenre[] = []

  popularMovies: InterfaceMovie[] = moviesStore.popularMovies
  topRatedMovies: InterfaceMovie[] = moviesStore.topRatedMovies

  async fetch() {
    await genresStore.fetchGenres()
    await moviesStore.fetchPopularMovies()
    await moviesStore.fetchTopRatedMovies()
    await moviesStore.fetchNowPlayingMovies()

    this.popularMovies = moviesStore.popularMovies
    this.topRatedMovies = moviesStore.topRatedMovies

    this.principalMovie =
      moviesStore.nowPlayingMovies.length > 0
        ? moviesStore.nowPlayingMovies[0]
        : {}

    if (Object.keys(this.principalMovie).length > 0)
      this.principalGenres = genresStore.genres
        .filter((genre): genre is InterfaceGenre & { id: number } => !!genre.id)
        .filter((genre) => this.principalMovie.genre_ids?.includes(genre.id))
  }

  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
  }

  checkIsMobile() {
    this.isMobile = screen.width < 640
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-position: center;
  background-size: 140%;
  height: 82vh;

  &::before {
    backdrop-filter: blur(28px);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media screen and (min-width: 640px) {
    &::before {
      backdrop-filter: blur(8px);
    }
  }

  &__content__text {
    color: #fff;
  }

  &__content__movie {
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.05));

    &__poster {
      background: #d8d8d8;
      background-position: center;
      background-size: cover;
      border-radius: 8px;
      height: 350px;
      width: 245px;

      @media screen and (min-width: 640px) {
        height: 395px;
        width: 100%;
      }
    }

    &__info {
      color: #fff;
      z-index: 10;

      > p {
        mix-blend-mode: normal;
        opacity: 0.8;
      }
    }

    &__info > h2 {
      @media screen and (min-width: 640px) {
        font-family: 'Fira Sans', sans-serif;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      }
    }

    &__overlay {
      background: linear-gradient(
        180deg,
        rgba(21, 20, 25, 0.0001) 0,
        rgba(21, 20, 25, 0.8) 100%
      );
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>

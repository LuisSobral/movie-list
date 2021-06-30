<template>
  <div>
    <section
      class="banner relative background-center"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          isMobile ? latestMovie.poster_path : latestMovie.backdrop_path
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
            class="
              banner__content__movie__poster
              background-cover background-center
            "
            :style="{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                isMobile ? latestMovie.poster_path : latestMovie.backdrop_path
              })`,
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
              {{ latestMovie.title }}
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
              <span
                v-for="(genre, index) in latestMovie.genres"
                :key="genre.id"
              >
                {{ genre.name
                }}<span v-if="index < latestMovie.genres.length - 1">, </span>
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
    <LayoutSectionList
      title="Os mais amados"
      title-font-size=""
      :additional-classes="['pl-8 ', 'sm:px-4']"
    >
      <PagesCarouselList :items="popularMovies">
        <template slot-scope="{ item }">
          <PagesCardMovie :heart="true" :movie="item" :poster="isMobile" />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <LayoutSectionList
      title="Os melhores avaliados"
      :additional-classes="['pl-8 ', 'sm:px-4']"
    >
      <PagesCarouselList :items="topRatedMovies">
        <template slot-scope="{ item }">
          <PagesCardMovie :star="true" :movie="item" :poster="isMobile" />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { moviesStore } from '~/store'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component
export default class HomePage extends Vue {
  isMobile: boolean = true
  latestMovie: InterfaceMovie = moviesStore.latest
  popularMovies: InterfaceMovie[] = moviesStore.popularMovies
  topRatedMovies: InterfaceMovie[] = moviesStore.topRatedMovies

  async fetch() {
    if (Object.keys(this.latestMovie).length === 0) {
      await moviesStore.fetchLatest()
      this.latestMovie = moviesStore.latest
    }

    if (this.popularMovies.length === 0) {
      await moviesStore.fetchPopularMovies()
      this.popularMovies = moviesStore.popularMovies
    }

    if (this.topRatedMovies.length === 0) {
      await moviesStore.fetchTopRatedMovies()
      this.topRatedMovies = moviesStore.topRatedMovies
    }
  }

  mounted() {
    this.isMobile = screen.width < 640
    window.addEventListener('resize', () => {
      this.isMobile = screen.width < 640
    })
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
    color: $color-white;
  }

  &__content__movie {
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.05));

    &__poster {
      border-radius: 8px;
      height: 350px;
      width: 245px;

      @media screen and (min-width: 640px) {
        height: 395px;
        width: 100%;
      }
    }

    &__info {
      color: $color-white;
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

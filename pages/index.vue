<template>
  <div>
    <section
      class="banner relative background-center"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          screenWidth < 768
            ? avengersMovie.poster_path
            : avengersMovie.backdrop_path
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
          md:py-0
          sm:px-8
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
                screenWidth < 768
                  ? avengersMovie.poster_path
                  : avengersMovie.backdrop_path
              })`,
            }"
          />
          <div
            class="
              banner__content__movie__info
              md:absolute md:bottom-10
              mt-3
              md:mt-0 md:ml-12
            "
          >
            <h2
              class="
                text-sm
                md:text-3xl
                line-height-lg
                md:line-height-4xl
                weight-semibold
                md:weight-medium
                mb-1
              "
            >
              {{ avengersMovie.title }}
            </h2>
            <p
              class="
                text-xs
                md:text-sm
                line-height-xs
                md:line-height-sm
                weight-medium
                mt-2
                md:mt-0
              "
            >
              <span
                v-for="(genre, index) in avengersMovie.genres"
                :key="genre.id"
              >
                {{ genre.name
                }}<span v-if="index < avengersMovie.genres.length - 1">, </span>
              </span>
            </p>
          </div>
          <div
            class="
              banner__content__movie__overlay
              none
              md:block md:absolute md:h-half md:bottom-0 md:left-0 md:right-0
            "
          />
        </div>
      </div>
    </section>
    <LayoutSectionList
      title="Os mais amados"
      title-font-size=""
      :additional-classes="['pl-8 ', 'sm:px-8']"
    >
      <PagesCarouselList :items="popularMovies" :items-per-slide="3">
        <template slot-scope="{ item }">
          <PagesCardMovie
            :heart="true"
            :movie="item"
            :poster="screenWidth < 1024"
          />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <LayoutSectionList
      title="Os melhores avaliados"
      :additional-classes="['pl-8 ', 'sm:px-8']"
    >
      <PagesCarouselList :items="topRatedMovies" :items-per-slide="3">
        <template slot-scope="{ item }">
          <PagesCardMovie
            :star="true"
            :movie="item"
            :poster="screenWidth < 1024"
          />
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
  screenWidth: number = 0
  avengersMovie: InterfaceMovie = moviesStore.avengers
  popularMovies: InterfaceMovie[] = moviesStore.popularMovies
  topRatedMovies: InterfaceMovie[] = moviesStore.topRatedMovies

  async fetch() {
    this.avengersMovie = moviesStore.avengers
    this.popularMovies = moviesStore.popularMovies
    this.topRatedMovies = moviesStore.topRatedMovies

    if (Object.keys(this.avengersMovie).length === 0) {
      await moviesStore.fetchLatest()
      this.avengersMovie = moviesStore.avengers
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
    this.screenWidth = screen.width
    window.addEventListener('resize', () => {
      this.screenWidth = screen.width
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

      @media screen and (min-width: 768px) {
        height: 395px;
        width: 100%;
      }
    }

    &__info {
      color: $color-white;
      z-index: 10;

      > p {
        mix-blend-mode: normal;
        opacity: $opacity-text;
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

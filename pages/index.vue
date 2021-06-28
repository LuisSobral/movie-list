<template>
  <div class="banner relative">
    <div
      class="banner__background h-full"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${principalMovie.backdrop_path})`,
      }"
    >
      <div
        class="
          banner__background__overlay
          absolute
          h-full
          placement-y-0 placement-x-0
        "
      />
    </div>
    <div
      class="
        banner__content
        container
        absolute
        flex
        justify-space-between
        h-full
        placement-y-0 placement-x-0
        mx-auto
        pt-14
        pb-10
        px-4
      "
    >
      <div class="banner__content__text">
        <h1 class="weight-extrabold text-4xl line-height-3xl mb-3">
          O cinema na suas mãos
        </h1>
        <p class="text-lg line-height-xl">
          Filmes adicionados e selecionados<br />exclusivamente para você
        </p>
      </div>
      <div
        class="banner__content__movie relative"
        :style="{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${principalMovie.backdrop_path})`,
        }"
      >
        <div
          class="
            banner__content__movie__name
            absolute
            flex
            justify-end
            h-half
            bottom-0
            placement-x-0
            px-14
          "
        >
          <h2 class="text-3xl line-height-4xl weight-medium mb-1">
            {{ principalMovie.title }}
          </h2>
          <p class="text-sm line-height-sm weight-medium mb-6">
            <span v-for="(genre, index) in principalGenres" :key="genre.id">
              {{ genre.name
              }}<span v-if="index < principalGenres.length - 1">, </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { genresStore, moviesStore } from '~/store'
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component({})
export default class HomePage extends Vue {
  principalMovie: InterfaceMovie = {}
  principalGenres: InterfaceGenre[] = []

  async fetch() {
    await genresStore.fetchGenres()
    await moviesStore.fetchNowPlayingMovies()

    this.principalMovie =
      moviesStore.nowPlayingMovies.length > 0
        ? moviesStore.nowPlayingMovies[0]
        : {}

    if (Object.keys(this.principalMovie).length > 0)
      this.principalGenres = genresStore.genres
        .filter((genre): genre is InterfaceGenre & { id: number } => !!genre.id)
        .filter((genre) => this.principalMovie.genre_ids?.includes(genre.id))

    console.info(this.principalGenres)
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 82vh;
  overflow: hidden;

  &__background {
    background-position: center;
    background-size: cover;
    filter: blur(8px);
    transform: scale(1.3);

    &__overlay {
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0.35)
      );
    }
  }

  &__content {
    color: #fff;
    flex-direction: column;

    &__movie {
      background-position: center;
      background-size: cover;
      border-radius: 8px;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.0976836));
      height: 395px;

      &__name {
        background: linear-gradient(
          180deg,
          rgba(21, 20, 25, 0.0001) 0%,
          rgba(21, 20, 25, 0.8) 100%
        );
        border-radius: 0 0 8px 8px;
        flex-direction: column;
      }

      &__name > h2 {
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      }

      &__name > p {
        mix-blend-mode: normal;
        opacity: 0.8;
      }
    }
  }
}
</style>

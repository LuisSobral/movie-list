<template>
  <div class="banner relative">
    <div
      class="banner__background h-full"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${nowPlayingPrincipal.backdrop_path})`,
      }"
    />
    <div
      class="
        banner__content
        container
        absolute
        h-full
        top-0
        left-0
        right-0
        mx-auto
        py-14
        px-4
      "
    >
      <div class="banner__text">
        <h1 class="inline-block weight-extrabold text-4xl line-height-3xl mb-3">
          O cinema na suas mãos
        </h1>
        <br />
        <p class="inline-block text-lg line-height-xl">
          Filmes adicionados e selecionados<br />exclusivamente para você
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  async fetch(this: HomePage) {
    this.nowPlaying = await this.$api.$repositories.movies.nowPlaying()
    this.nowPlayingPrincipal = this.nowPlaying.results[0]
  },
})
export default class HomePage extends Vue {
  nowPlaying = { results: [] }
  nowPlayingPrincipal = {}
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
    transform: scale(1.02);
  }

  &__content {
    color: #fff;
  }

  &__text {
    float: left;
  }
}
</style>

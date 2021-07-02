<template>
  <nuxt-link :to="`/movie/${movie.id}`" class="block sm:relative">
    <div
      class="card relative background-cover background-center"
      :class="{
        'card--hover': hoverEffect,
        card__poster: poster,
        card__noimage: !movie.poster_path && !movie.backdrop_path,
      }"
      :style="backgroundStyle"
      @mouseover="mouseOverFunction"
      @mouseleave="mouseLeaveFunction"
    >
      <div
        v-if="heart || star"
        class="
          card__info
          absolute
          text-sm
          sm:text-xs
          line-height-lg
          sm:line-height-sm
          text-center
          bottom-2
          left-4
          pa-1
        "
        :class="{ card__heart: heart, card__star: star, 'sm:bottom-16': hover }"
      >
        <font-awesome-icon :icon="['fas', heart ? 'heart' : 'star']" />
        <span class="weight-bold">{{
          heart ? movie.popularity : movie.vote_average
        }}</span>
      </div>
      <div
        class="
          card__overlay
          none
          sm:block sm:absolute sm:bottom-0 sm:left-0 sm:right-0
        "
        :class="{ 'sm:h-half': hover }"
      >
        <h3
          class="sm:absolute weight-bold line-height-lg sm:px-4 lg:bottom-n-12"
          :class="{ 'lg:bottom-6': hover }"
          :style="{ opacity: hover ? 1 : 0 }"
        >
          {{ movie.title }}
        </h3>
      </div>
      <div
        v-if="!movie.poster_path && !movie.backdrop_path"
        class="
          absolute
          flex
          items-center
          justify-center
          text-center
          weight-bold
          h-full
          w-full
        "
      >
        {{ movie.title }}
      </div>
    </div>
    <div v-if="showName" class="card__poster__name">
      <h6 class="weight-semibold text-md mt-6">{{ movie.title }}</h6>
      <p class="weight-medium text-xs mt-1">
        <span v-for="(genre, index) in genres" :key="genre.id">
          {{ genre.name }}<span v-if="index < genres.length - 1">, </span>
        </span>
      </p>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { genresStore } from '~/store'

import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfaceGenre } from '~/types/InterfaceGenre'

@Component
export default class CarouselMoviesComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly movie!: InterfaceMovie
  @Prop({ type: Boolean, required: false, default: false })
  readonly star!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly heart!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly poster!: boolean

  @Prop({ type: Boolean, required: false, default: true })
  readonly hoverEffect!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly showName!: boolean

  hover: boolean = false

  get mouseOverFunction() {
    return this.hoverEffect
      ? () => {
          this.hover = true
        }
      : () => {}
  }

  get mouseLeaveFunction() {
    return this.hoverEffect
      ? () => {
          this.hover = false
        }
      : () => {}
  }

  get genres() {
    if (genresStore.genres.length > 0) {
      return genresStore.genres
        .filter((genre): genre is InterfaceGenre & { id: number } => !!genre.id)
        .filter((genre) => this.movie.genre_ids?.includes(genre.id))
    }
  }

  get backgroundStyle() {
    if (!this.movie.poster_path && !this.movie.backdrop_path) {
      return
    }

    const backgroundImage =
      this.movie.poster_path || this.movie.backdrop_path
        ? `url(https://image.tmdb.org/t/p/original${
            this.poster ? this.movie.poster_path : this.movie.backdrop_path
          })`
        : undefined

    return { backgroundImage }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #1f2833;
  text-decoration: none;
}

.card {
  border-radius: 6px;
  height: 205px;

  &--hover {
    transition: transform 0.2s;

    @media screen and (min-width: 1024px) {
      &:hover {
        transform: scale(1.3);
        z-index: 10;
      }
    }
  }

  &__poster {
    width: 120px;

    @media screen and (min-width: 640px) {
      height: 280px;
      width: auto;
    }

    @media screen and (min-width: 640px) {
      height: 350px;
    }

    &__name {
      max-width: 120px;

      > p {
        color: $color-grey-text;
        mix-blend-mode: normal;
        opacity: $opacity-text;
      }
    }
  }

  &__info {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    color: rgba(103, 123, 152, 1);
    font-feature-settings: 'pnum' on, 'lnum' on;
    transition: all 1s ease-in-out;
  }

  &__heart {
    > svg {
      color: $color-heart;
    }
  }

  &__star {
    > svg {
      color: $color-star;
    }
  }

  &__overlay {
    background: linear-gradient(
      180deg,
      rgba(21, 20, 25, 0.0001) 0,
      rgba(21, 20, 25, 0.8) 100%
    );
    border-radius: 0 0 6px 6px;

    h3 {
      color: $color-white;
      opacity: 0;
      transition: all 1s ease-in-out;
    }
  }

  &__noimage {
    background: #000;
    color: $color-white;
  }
}
</style>

<template>
  <nuxt-link :to="`/movie/${movie.id}`" class="block sm:relative">
    <div
      class="card relative"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          poster ? movie.poster_path : movie.backdrop_path
        })`,
      }"
      @mouseover="hover = true"
      @mouseleave="hover = false"
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
          bottom-2 left-4
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
        <h3 v-if="hover" class="sm:absolute weight-bold line-height-lg sm:px-4" :class="{ 'sm:bottom-6': hover }">{{ movie.title }}</h3>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component
export default class CarouselMoviesComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly movie!: InterfaceMovie
  @Prop({ type: Boolean, required: false, default: false })
  readonly star!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly heart!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly poster!: boolean

  hover: boolean = false
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.card {
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  height: 205px;
  transition: transform 0.2s;

  @media screen and (min-width: 640px) {
    &:hover {
      transform: scale(1.3);
      z-index: 10;
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
      color: #f26e63;
    }
  }

  &__star {
    > svg {
      color: rgba(250, 198, 0, 1);
    }
  }

  &__overlay {
    background: linear-gradient(
      180deg,
      rgba(21, 20, 25, 0.0001) 0,
      rgba(21, 20, 25, 0.8) 100%
    );
    border-radius: 0 0 6px 6px;
    transition: all 1s ease-in-out;

    h3 {
      bottom: 100px;
      color: #fff;
      transition: all 1s ease-in-out;
    }
  }
}
</style>

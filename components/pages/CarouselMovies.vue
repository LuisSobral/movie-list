<template>
  <div class="carousel sm:mx-n10">
    <div class="carousel__wrapper flex sm:px-4">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="
          carousel__slides
          justify-center
          flex-grow
          grid grid-gap-20
          sm:grid-columns-4 sm:w-full sm:py-8
          pr-5
          sm:px-7
        "
      >
        <div
          v-for="item in slide"
          :key="item.id"
          class="carousel__item sm:w-auto"
        >
          <slot :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { InterfaceMovie } from '~/types/InterfaceMovie'

@Component
export default class CarouselMoviesComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly movies!: InterfaceMovie[]
  slides: Array<InterfaceMovie[]> = []

  created() {
    const itemsClone = [...this.movies]
    this.slides = this.separateSlides(itemsClone, 4)
  }

  separateSlides(itemsClone: InterfaceMovie[], itemsPerSlide: number) {
    const slides: Array<InterfaceMovie[]> = []

    while (itemsClone.length) {
      slides.push(itemsClone.splice(0, itemsPerSlide))
    }

    return slides
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  max-height: 268px;
  overflow: hidden;

  &__wrapper {
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
  }

  &__slides {
    grid-auto-flow: column;
  }

  &__item {
    width: 120px;
  }
}
</style>

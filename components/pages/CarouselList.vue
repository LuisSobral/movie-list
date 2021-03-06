<template>
  <div class="carousel lg:mx-n10">
    <div class="carousel__wrapper flex lg:px-4">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="
          carousel__slides
          justify-center
          flex-grow
          grid grid-gap-20
          sm:w-full
          pr-5
          lg:px-7 lg:py-8
        "
        :class="[
          `sm:grid-columns-${itemsPerSlide}`,
          `md:grid-columns-${itemsPerSlideMd}`,
          `lg:grid-columns-${itemsPerSlideLg}`,
        ]"
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
import { InterfaceGenre } from '~/types/InterfaceGenre'
import { InterfaceMovie } from '~/types/InterfaceMovie'
import { InterfacePeople } from '~/types/InterfacePeople'

@Component
export default class CarouselListComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly items!: (
    | InterfaceMovie
    | InterfacePeople
    | InterfaceGenre
  )[]

  @Prop({ type: Number, required: false, default: 4 })
  readonly itemsPerSlide!: number

  @Prop({ type: Number, required: false, default: 4 })
  readonly itemsPerSlideMd!: number

  @Prop({ type: Number, required: false, default: 4 })
  readonly itemsPerSlideLg!: number

  slides: Array<(InterfaceMovie | InterfacePeople | InterfaceGenre)[]> = []

  created() {
    const itemsClone = [...this.items]

    if (process.client) {
      if (screen.width >= 1024) {
        this.slides = this.separateSlides(itemsClone, this.itemsPerSlideLg)
      } else if (screen.width >= 768) {
        this.slides = this.separateSlides(itemsClone, this.itemsPerSlideMd)
      } else {
        this.slides = this.separateSlides(itemsClone, this.itemsPerSlide)
      }
    }
  }

  separateSlides(
    itemsClone: (InterfaceMovie | InterfacePeople | InterfaceGenre)[],
    itemsPerSlide: number
  ) {
    const slides: Array<(InterfaceMovie | InterfacePeople | InterfaceGenre)[]> =
      []

    while (itemsClone.length) {
      slides.push(itemsClone.splice(0, itemsPerSlide))
    }

    return slides
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  overflow: hidden;

  &__wrapper {
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__slides {
    grid-auto-flow: column;
  }
}
</style>

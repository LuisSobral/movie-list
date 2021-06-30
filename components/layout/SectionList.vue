<template>
  <section class="container mt-12 sm:mx-auto" :class="additionalClasses">
    <h3
      class="flex justify-space-between items-center weight-bold mb-7"
      :class="titleFontSize"
    >
      {{ title }}
      <span class="weight-medium mr-10 sm:mr-0" :class="additionalTextFontSize">
        <span class="additional-text inline-block sm:pr-2">Ver todos</span>
        <font-awesome-icon
          v-if="hasIcon"
          class="none sm:inline"
          :icon="['fas', 'chevron-right']"
        />
      </span>
    </h3>
    <slot />
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class SectionListComponent extends Vue {
  @Prop({ type: String, required: true }) title!: string

  @Prop({
    type: String,
    required: false,
    default: 'sm:text-2xl sm:line-height-xl ',
  })
  readonly titleFontSize!: string

  @Prop({ type: String, required: false, default: 'text-md' })
  readonly additionalTextFontSize!: string

  @Prop({ type: [String, Array], required: false, default: '' })
  readonly additionalClasses!: string | string[]

  @Prop({ type: Boolean, required: false, default: true })
  readonly hasIcon!: string | string[]
}
</script>

<style lang="scss" scoped>
section {
  .additional-text {
    color: $color-red;
  }
}
</style>

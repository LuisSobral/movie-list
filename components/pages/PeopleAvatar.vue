<template>
  <div
    class="avatar background-cover background-center mx-auto"
    :style="{
      height: `${sizeMd || size}px`,
      width: `${sizeMd || size}px`,
      backgroundImage: `url(${image})`,
    }"
  />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class HomePage extends Vue {
  @Prop({ type: Number, required: false, default: 40 })
  size!: number

  @Prop({ type: Number, required: false, default: null })
  sizeMd!: number

  @Prop({ type: String, required: true })
  image!: string
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.05);
}
</style>

<template>
  <div class="search__input relative container mx-auto">
    <input
      v-model="query"
      type="text"
      class="py-3 pl-13 pr-5 weight-bold text-sm"
      placeholder="Busque por filmes, gêneros ou atores"
      @blur="
        !toolbar
          ? $emit('change', query)
          : $router.push({ path: '/busca', query: { search: query } })
      "
      @keydown.enter="
        toolbar
          ? $emit('change', query)
          : $router.push({ path: '/busca', query: { search: query } })
      "
    />
    <font-awesome-icon
      :icon="['fas', 'search']"
      class="absolute top-3 left-10 sm:left-12 md:left-15 lg:left-6 text-lg"
    />
    <font-awesome-icon
      v-if="query"
      :icon="['fas', 'times']"
      class="
        absolute
        top-2
        right-10
        sm:right-12
        md:right-15
        lg:right-8
        text-2xl
      "
      @click="query = ''"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component
export default class SearchInputComponent extends Vue {
  query: string = ''

  @Prop({ type: Boolean, required: false, default: true })
  readonly toolbar!: boolean
}
</script>

<style lang="scss" scoped>
.search {
  &__input {
    > svg {
      color: $normal-color;
    }

    > input {
      border: 1px solid rgba(31, 40, 51, 0.2);
      border-radius: 30px;
      width: 90vw;

      @media screen and (min-width: 1024px) {
        width: 357px;
      }

      &::placeholder {
        color: $important-color;
        font-family: $font;
        font-size: 13px;
        font-weight: 500;
      }

      &:focus {
        border: 1px solid #000;

        + svg {
          color: #000;
        }
      }
    }
  }
}
</style>

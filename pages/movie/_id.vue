<template>
  <div class="lg:container mx-auto lg:px-6 xl:px-0">
    <section class="video lg:mt-8">
      <div
        class="relative h-full background-center background-cover"
        :style="{
          backgroundImage: principalTrailer && principalTrailer.key ? `url(https://img.youtube.com/vi/${principalTrailer.key}/0.jpg)` : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }"
      >
        <div class="video__overlay absolute placement-y-0 placement-x-0" />
        <div class="video__buttons flex flex-column justify-center h-full">
          <div
            class="
              video__buttons__actions
              w-full
              absolute
              flex
              justify-space-between
              text-2xl
              top-6
              px-8
            "
          >
            <div>
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'heart']" />
              <font-awesome-icon
                class="inline-block ml-9"
                :icon="['fas', 'share-square']"
              />
            </div>
          </div>
          <div v-if="principalTrailer && principalTrailer.key" class="video__buttons__play relative mx-auto">
            <font-awesome-icon
              class="absolute placement-y-0 placement-x-0 ma-auto"
              :icon="['fas', 'play']"
            />
          </div>
        </div>
        <iframe
          v-if="principalTrailer && principalTrailer.key"
          class="none"
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/${principalTrailer.key}`"
          :title="principalTrailer.name"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>
    <section class="info flex flex-column justify-center mt-8 px-8">
      <h5 class="info__title weight-semibold text-lg sm:text-4xl mb-2">
        {{ movie.title }}
        <span v-if="movie.release_date"
          >({{ new Date(movie.release_date).getFullYear() }})</span
        >
      </h5>
      <p class="info__genres weight-medium text-sm mb-3">
        <span v-for="(genre, index) in movie.genres" :key="genre.id">
          {{ genre.name }}<span v-if="index < movie.genres.length - 1">, </span>
        </span>
      </p>
      <span class="info__statistics inline-block text-sm mb-3">
        <font-awesome-icon
          class="info__statistics__heart"
          :icon="['fas', 'heart']"
        />
        <span class="inline-block ml-2 weight-bold">{{
          movie.popularity
        }}</span>
        <font-awesome-icon
          class="info__statistics__star ml-5"
          :icon="['fas', 'star']"
        />
        <span class="inline-block ml-2 weight-bold"
          >{{ movie.vote_average }}/10</span
        >
      </span>
    </section>
    <section class="mt-10">
      <div class="tabs">
        <div class="tabs__header w-full pb-1 px-6">
          <div class="tabs__header__options w-full grid grid-columns-12">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              :ref="`tabItem${index}`"
              class="tab"
              :class="[
                tab.span,
                tab.alignment,
                { 'active weight-semibold': tabIndex === index },
              ]"
              @click="changeTab(index)"
            >
              {{ tab.label }}
            </div>
          </div>
          <div class="tabs__header__slider__container relative px-2">
            <div
              ref="tabSlider"
              class="tabs__header__slider absolute left-0 bottom-0 mx-auto"
            />
          </div>
        </div>
        <div class="md:grid md:grid-gap-20 md:grid-columns-2 md:grid-rows-2 mt-10 px-6">
          <div class="card tabs__content md:grid-rows-span-2 w-full py-4 px-6">
            <span class="weight-bold">{{ movie.runtime }} min</span>
            <div
              class="
                tabs__content__certification
                inline-block
                weight-bold
                px-2
                py-1
                mx-8
              "
            >
              {{ certification }}
            </div>
            <span v-if="movie.release_date" class="weight-bold">{{
              new Date(movie.release_date).getFullYear()
            }}</span>
            <p
              class="
                tabs__content__overview
                text-sm
                line-height-xl
                weight-normal
                mt-4
              "
            >
              {{ movie.overview }}
            </p>
          </div>
          <div class="card cast mt-10 md:mt-0 mr-n6 md:mr-0 py-4 lg:px-16 pl-4">
            <h3 class="mb-2">Elenco</h3>
            <PagesCarouselList :items="cast" :items-per-slide="8" :items-per-slide-md="4">
              <template slot-scope="{ item }">
                <PagesPeopleAvatar
                  :size="60"
                  :image="`https://image.tmdb.org/t/p/original${item.profile_path}`"
                />
              </template>
            </PagesCarouselList>
          </div>
          <div class="card details mt-10 md:mt-n12 lg:mt-0 pa-4 md:py-2">
            <h3 class="mb-5 md:mb-3">Detalhes</h3>
            <p class="pb-3 lg:inline-block">
              <span class="card__text weight-medium text-sm"
                >Título Original:</span
              >
              <span class="weight-bold">{{ movie.original_title }}</span>
            </p>
            <p class="pb-3 lg:inline-block lg:mx-2">
              <span class="card__text weight-medium text-sm">Local:</span>
              <span class="weight-bold">{{
                movie.production_countries[0].name
              }}</span>
            </p>
            <p class="pb-3 lg:inline-block">
              <span class="card__text weight-medium text-sm"
                >Estreia no Brasil:</span
              >
              <span class="weight-bold">{{ releaseBR }}</span>
            </p>
            <p class="pb-3 lg:inline-block lg:mx-2">
              <span class="card__text weight-medium text-sm">Direção:</span>
              <span class="weight-bold">{{
                crew.find((people) => people.job === 'Director').name
              }}</span>
            </p>
            <p class="pb-3 lg:inline-block">
              <span class="card__text weight-medium text-sm">Produção:</span>
              <span class="weight-bold"
                ><span
                  v-for="(company, index) in movie.production_companies"
                  :key="company.id"
                >
                  {{ company.name
                  }}<span v-if="index < movie.production_companies.length - 1"
                    >/</span
                  >
                </span></span
              >
            </p>
          </div>
        </div>
      </div>
    </section>
    <LayoutSectionList
      class="pl-6 lg:pl-0"
      title="Filmes relacionados"
      :has-additional-text="false"
    >
      <PagesCarouselList :items="similarMovies" :items-per-slide="4">
        <template slot-scope="{ item }">
          <PagesCardMovie :movie="item" :poster="true" :hover-effect="false" />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
    <LayoutSectionList
      class="pl-6 lg:pl-0"
      :title="`Mais de ${movie.genres[0].name}`"
      :has-additional-text="false"
    >
      <PagesCarouselList :items="moreFromGenre" :items-per-slide="4">
        <template slot-scope="{ item }">
          <PagesCardMovie :movie="item" :poster="true" :hover-effect="false" />
        </template>
      </PagesCarouselList>
    </LayoutSectionList>
  </div>
</template>

<script lang="ts">
import { Vue, Ref, Component } from 'nuxt-property-decorator'

@Component
export default class HomePage extends Vue {
  tabIndex: number = 0
  tabs: object[] = [
    { label: 'Info', span: 'grid-span-2 md:grid-span-1', alignment: 'text-left' },
    { label: 'Reviews', span: 'grid-span-3 md:grid-span-2', alignment: 'text-center' },
    { label: 'Trailers', span: 'grid-span-3 md:grid-span-2', alignment: 'text-center' },
  ]

  @Ref('tabSlider')
  readonly tabSlider!: HTMLDivElement

  async asyncData(context: any) {
    const response = await context.app.$api.$repositories.movies.movie(
      parseInt(context.params.id),
      'videos,releases,credits,similar'
    )

    if (Object.keys(response).length === 0) {
      context.redirect('/')
    }

    const trailers = response.videos.results.filter(
      (video: any) => video.type === 'Trailer'
    )

    const moreFromGenre = (
      await context.app.$api.$repositories.genres.moviesGenre(
        response.genres[0].id
      )
    ).results

    return {
      moreFromGenre,
      movie: response,
      cast: response.credits.cast,
      crew: response.credits.crew,
      similarMovies: response.similar.results,
      principalTrailer: trailers[Math.floor(Math.random() * trailers.length)],
      releaseBR: response.releases.countries.find(
        (release: any) => release.iso_3166_1 === 'BR'
      ).release_date,
      certification: response.releases.countries.find(
        (release: any) => release.iso_3166_1 === 'BR'
      ).certification,
    }
  }

  changeTab(index: number) {
    this.tabIndex = index
    const tabElem: Element[] = this.$refs[`tabItem${index}`] as Element[]

    this.tabSlider.style.width = `${tabElem[0].clientWidth}`
    this.tabSlider.style.left = `${tabElem[0].clientWidth * index}px`
  }
}
</script>

<style lang="scss" scoped>
.video {
  height: 28vh;

  @media screen and (min-width: 768px) {
    height: 54vh;
  }

  @media screen and (min-width: 1024px) {
    > div {
      border-radius: 8px;
    }

    &__overlay {
      border-radius: 8px;
    }
  }

  &__overlay {
    background: #262830;
    box-shadow: 0 5px 20px rgba(31, 40, 51, 0.05);
    opacity: 0.5;
  }

  &__buttons__actions {
    color: $color-white;
  }

  &__buttons__play {
    background: #dadada;
    border-radius: 50%;
    height: 48px;
    mix-blend-mode: normal;
    opacity: $opacity-text;
    width: 48px;
  }
}

.card {
  background-color: $color-white;
  border-radius: 6px;
  font-feature-settings: 'pnum' on, 'lnum' on;

  h3,
  &__text {
    color: #424160;
    opacity: $opacity-text;
  }
}

.info {
  &__genres {
    color: $color-grey-text;
    mix-blend-mode: normal;
    opacity: $opacity-text;
  }

  &__statistics {
    color: #677b98;
    font-feature-settings: 'pnum' on, 'lnum' on;

    &__heart {
      color: $color-heart;
    }

    &__star {
      color: $color-star;
    }
  }
}

.tabs {
  overflow: hidden;

  .tab {
    &.active {
      color: $color-red;
    }
  }

  &__header__slider__container {
    height: 4px;
  }

  &__header__slider {
    background: $color-red;
    border-radius: 1px;
    height: 2px;
    transition: left 0.6s ease-out;
    width: 25px;
  }

  &__content {
    &__certification {
      background-color: #ff9243;
      border-radius: 4px;
      color: $color-white;
    }

    &__overview {
      color: $color-grey-text;
      opacity: $opacity-text;
    }
  }
}

.cast {
  @media screen and (min-width: 768px) {
    max-height: 154px;
  }
}

.details {
  @media screen and (min-width: 1024px) {
    max-height: 154px;
  }
}
</style>

<template>
  <header class="header absolute top-0 bottom-0 left-0 right-0">
    <div
      class="
        container
        relative
        flex
        items-center
        justify-space-between
        h-full
        mx-auto
      "
    >
      <nav>
        <ul class="header__nav flex pa-0">
          <li class="px-4">
            <nuxt-link
              to="/"
              class="header__nav__link weight-bold"
              active-class="active relative"
              >Início</nuxt-link
            >
          </li>
          <li class="px-4">
            <nuxt-link
              to="/descobrir"
              class="header__nav__link weight-bold"
              active-class="active relative weight-bold"
              >Descobrir</nuxt-link
            >
          </li>
          <li class="px-4">
            <nuxt-link
              to="/favoritos"
              class="header__nav__link weight-bold"
              active-class="active relative weight-bold"
              >Favoritos</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <div>
        <div class="header__nav__input relative">
          <font-awesome-icon :icon="['fas', 'search']" class="absolute top-seven-halves left-6" />
          <input
            type="text"
            class="pl-13 pr-6"
            placeholder="Busque por filmes, gêneros ou atores"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: 100px;

  &__nav {
    list-style: none;

    &__link {
      color: $normal-color;
      text-decoration: none;

      &.active {
        color: $important-color;
        cursor: default;
      }

      &.active::after {
        background: #dd3e3e;
        border-radius: 9px;
        bottom: -8px;
        content: '';
        height: 3px;
        left: 0;
        margin: 0 auto;
        position: absolute;
        right: 0;
        width: 25px;
      }
    }

    &__input > input {
      border: 1px solid rgba(31, 40, 51, 0.2);
      border-radius: 30px;
      height: 44px;
      width: 357px;

      &::placeholder {
        color: $important-color;
        font-family: $font;
        font-size: 13px;
        font-weight: 500;
      }
    }

    &__input > svg {
      color: $normal-color;
    }
  }
}
</style>

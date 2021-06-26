<template>
  <header class="header">
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
      <div class="flex items-center">
        <div class="header__nav__input relative">
          <font-awesome-icon
            :icon="['fas', 'search']"
            class="absolute ml-6 mt-3"
          />
          <input
            type="text"
            class="py-3 pl-13 pr-5"
            placeholder="Busque por filmes, gêneros ou atores"
          />
        </div>
        <div class="header__nav__avatar ml-8" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
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

    &__avatar {
      background-image: url('/avatar.jpg');
      background-position: center;
      background-size: cover;
      border-radius: 37px;
      height: 35px;
      width: 35px;
    }
  }
}
</style>

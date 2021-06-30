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
              class="header__nav__link relative weight-bold"
              exact-active-class="active"
              >Início</nuxt-link
            >
          </li>
          <li class="px-4">
            <nuxt-link
              to="/descobrir"
              class="header__nav__link relative weight-bold"
              exact-active-class="active"
              >Descobrir</nuxt-link
            >
          </li>
          <li class="px-4">
            <nuxt-link
              to="/favoritos"
              class="header__nav__link relative weight-bold"
              exact-active-class="active"
              >Favoritos</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <div class="flex items-center">
        <LayoutSearchInput />
        <div
          class="header__nav__avatar background-cover background-center ml-8"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: $color-white;
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

    &__avatar {
      background-image: url('/avatar.jpg');
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }
}
</style>

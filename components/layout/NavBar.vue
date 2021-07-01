<template>
  <nav class="nav-bar w-full fixed grid grid-columns-5 bottom-0 text-center items-center py-4 lg:none">
    <nuxt-link to="/" class="flex flex-column items-center weight-semibold" exact-active-class="nav-bar__link--active">
      <font-awesome-icon :icon="['fas', 'home']" />
      Inicio
    </nuxt-link>
    <nuxt-link to="/busca" class="flex flex-column items-center weight-semibold" exact-active-class="nav-bar__link--active">
      <font-awesome-icon :icon="['fas', 'search']" />
      Buscar
    </nuxt-link>
    <nuxt-link to="/descobrir" class="flex flex-column items-center weight-semibold" exact-active-class="nav-bar__link--active">
      <font-awesome-icon :icon="['fas', 'ticket-alt']" />
      Descobrir
    </nuxt-link>
    <nuxt-link to="/favoritos" class="flex flex-column items-center weight-semibold" exact-active-class="nav-bar__link--active">
      <font-awesome-icon :icon="['fas', 'heart']" />
      Favoritos
    </nuxt-link>
    <div class="flex flex-column items-center">
      <PagesPeopleAvatar image="/avatar.jpg" :size="22" />
      <span class="weight-semibold">Perfil</span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar {
  background-color: $color-white;
  color: #9fabbc;

  a {
    color: #9fabbc;
    text-decoration: none;
  }

  &__link--active {
    color: $important-color !important;
  }
}
</style>
<template>
  <div>
    <LayoutTheToolbar class="none lg:block" />
    <main>
      <Nuxt />
    </main>
    <LayoutNavBar />
  </div>
</template>

<style lang="scss" scoped>
main {
  padding-bottom: 84px;

  @media screen and (min-width: 1024px) {
    padding-bottom: 48px;
  }
}
</style>

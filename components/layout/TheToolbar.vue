<template>
  <header class="absolute">
    <div class="container relative flex align-center fill-height mx-auto">
      <nav>
        <ul class="flex text-center">
          <li class="active weight-medium px-4">Início</li>
          <li class="weight-medium px-4">Descobrir</li>
          <li class="weight-medium px-4">Favoritos</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul > li {
    color: #9FABBC;
  }

  ul > li.active {
    color: #1F2833;
    position: relative;
  }

  ul > li.active::after {
    content: '';
    width: 25px;
    height: 3px;
    background: #DD3E3E;
    border-radius: 9px;
    margin: 0 auto;
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
  }
}

.absolute {
  position: absolute;
}

.container {
  width: 100%;
  max-width: 1280px;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.fill-height {
  height: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-center {
  text-align: center;
}

.weight-medium {
  font-weight: 700;
}

.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
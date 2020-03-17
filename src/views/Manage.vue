<template>
  <div class="main">
    <transition name='component-fade' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
</script>

<style lang="scss" scope>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>

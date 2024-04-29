<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navBar from './components/Global/navBar.vue';
import footerComponent from './components/Global/footerComponent.vue';
</script>

<template>
  <navBar />
  <RouterView />
  <footerComponent />
</template>

<style scoped>

</style>

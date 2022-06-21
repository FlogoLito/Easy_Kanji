<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MainPage from './components/MainPage.vue';
</script>

<template>
  <MainPage></MainPage>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* height: 100%; */
  height: -webkit-fill-available;
}
#app:-webkit-full-screen {
  display: block;
}
#app:-moz-full-screen {
  display: block;
}
#app::fullscreen {
  display: block;
}

body {
  margin: 0;
  background-color: #ffe7e7;
  min-height: -webkit-fill-available;
}
</style>

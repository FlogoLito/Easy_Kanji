<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MainPage from './components/MainPage.vue';
import { ref } from 'vue';


var trueHeight = ref(window.innerHeight);

window.addEventListener("resize", onResize);


function onResize() {
  trueHeight.value = window.innerHeight
}

</script>

<template>
  <MainPage :style="{ 'height': trueHeight + 'px' }"></MainPage>
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
  background-color: #ffe7e7;
}
#app:-webkit-full-screen {
  display: block;
  width: 100%;
  height: 100%;
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
  overscroll-behavior-y: contain;
}
</style>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MainPage from './components/MainPage.vue';
import { ref, nextTick } from 'vue';


var trueHeight = ref(window.innerHeight);

window.addEventListener("resize", onResize);


function onResize() {
  nextTick(() => {
    // DOM is now updated, so we should be able to get the new size of 
    // the card component.
    // unfortunately, it seems that it doesn't work when getting off of 
    // fullscreen



    var canvas;
    var ctx;
    try {
      canvas = document.getElementById('can') as HTMLCanvasElement;
      if (canvas === null) {
        throw new Error("Canva not found")
      }
      ctx = canvas.getContext('2d');
      if (ctx === null) {
        throw new Error("Context of canva not found")
      }
    }
    catch (Error) {
      return;
    }

    var elemCanva = document.querySelector(".main-page__container-canvas");
    if (elemCanva !== null) {

      ctx.canvas.width = elemCanva.clientWidth;
      ctx.canvas.height = elemCanva.clientHeight;
    }



    ctx.lineWidth = 15;
    trueHeight.value = window.innerHeight

  });
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
  overflow: hidden;
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

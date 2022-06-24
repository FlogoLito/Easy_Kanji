<template>
    <div
        class="panel"
        :style="{ 'height': trueHeight + 'px' }"
        :class="{ 'panel--active': isOpen }"
    >
        <div></div>
    </div>
    <div class="burger" :class="{ 'burger--active': isOpen, }">
        <input id="burger__menu-toggle" type="checkbox" @click="openCloseMenu()" />
        <label class="burger__menu-button-container" for="burger__menu-toggle">
            <div class="burger__menu-button"></div>
        </label>
    </div>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

var isOpen = ref(false)
var trueHeight = ref(window.innerHeight);




function openCloseMenu() {
    isOpen.value = !isOpen.value;

}

window.addEventListener("resize", onResize);


function onResize() {
    trueHeight.value = window.innerHeight
}

</script>
    
<style src="./Burger.css" scoped>
</style>
<template>
    <div class="panel" :class="{ 'panel--active': isOpen }">
        <div class="burger" :class="{ 'burger--active': isOpen }">
            <input id="burger__menu-toggle" type="checkbox" />
            <label class="burger__menu-button-container" for="burger__menu-toggle">
                <div class="burger__menu-button" @click="openCloseMenu()"></div>
            </label>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';

var isOpen = ref(false)

function openCloseMenu() {
    console.log("on ouvre le menu");
    isOpen.value = !isOpen.value;

}

</script>
    
<style src="./Burger.css" scoped>
</style>
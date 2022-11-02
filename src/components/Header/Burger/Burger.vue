<template>
    <div
        class="panel"
        :style="{ 'height': trueHeight + 'px' }"
        :class="{ 'panel--active': isOpen }"
    >
        <div v-if="isOpen || isDesktop" class="panel__section-main">
            <div class="panel__section" @click="resetDeck()">Reset deck</div>
        </div>

        <div v-if="isOpen || isDesktop" class="panel__section-footer">
            <div class="panel__section">Version: 1.0</div>
            <div class="panel__section">About</div>
        </div>
    </div>
    <transition name="fade" v-if="isOpen">
        <div class="panel__overlay" :style="{ 'height': trueHeight + 'px' }" @click="onClickOverlay()"></div>
    </transition>
    <div class="burger" :class="{ 'burger--active': isOpen, }">
        <input type="checkbox" :class="{'burger__menu-toggle--open': isOpen, 'burger__menu-toggle':!isOpen }" @click="openCloseMenu()" />
        <label class="burger__menu-button-container" for="burger__menu-toggle">
            <div class="burger__menu-button"></div>
        </label>
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { resetDeck } from '../../Deck/deck';

var isOpen = ref(false)
var isDesktop = ref(false)
var trueHeight = ref(window.innerHeight);


// function resetDeck() {
//     console.log("reset deck")
//     resetDeck();

// }


function openCloseMenu() {
    isOpen.value = !isOpen.value;

}

window.addEventListener("resize", onResize);


function onResize() {
    trueHeight.value = window.innerHeight
    if (window.innerWidth >= 1280)
    {
        isDesktop.value = true;
    }
    else {
        isDesktop.value = false;
    }
}

function onClickOverlay() {
    isOpen.value = false;
}

onMounted(() => {

    if (window.innerWidth >= 1280)
    {
        isDesktop.value = true;
    }

});

</script>
    
<style src="./Burger.css" scoped>
</style>
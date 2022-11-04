<template>
    <div class="panel" :style="{ 'height': trueHeight + 'px' }" :class="{ 'panel--active': isOpen }">
        <div v-if="isOpen || isDesktop" @click="clickReset()" class="panel__section-main">
            <div class="panel__section">Reset deck</div>
        </div>

        <div v-if="isOpen || isDesktop" class="panel__section-footer">
            <div class="panel__section">Version: 1.0</div>
            <div @click="aboutPopin()" class="panel__section">About</div>
        </div>
        <div v-if="showAbout" class="panel__info-about">
            This web app was made in order to learn the kanjis using the flashcard
            method. It's free and open source !
            License : MIT
            <div>
                Developper : Florent Beillonnet
                <!-- Place this tag where you want the button to render. -->
                <github-button href="https://github.com/FlogoLito"
                    data-color-scheme="no-preference: light; light: light; dark: dark;"
                    aria-label="Follow @FlogoLito on GitHub">Follow @FlogoLito</github-button>
                <github-button href="https://github.com/FlogoLito/Easy_Kanji"
                    data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star"
                    aria-label="Star FlogoLito/Easy_Kanji on GitHub">Star</github-button>
            </div>
            <div>
                Designer : Fantine Mcrgr
            </div>
            <div>
                The recognition engine was developped by Dominik Klein and Seth Clydesdale
                <github-button href="https://github.com/asdfjkl"
                    data-color-scheme="no-preference: light; light: light; dark: dark;"
                    aria-label="Follow @asdfjkl on GitHub">Follow @asdfjkl</github-button>
                <!-- Place this tag where you want the button to render. -->
                <github-button href="https://github.com/asdfjkl/kanjicanvas"
                    data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star"
                    aria-label="Star asdfjkl/kanjicanvas on GitHub">Star</github-button>
            </div>
            <div @click="closeAboutPopin()" class="panel__cross">
                +
            </div>
        </div>
    </div>
    <transition name="fade" v-if="isOpen">
        <div class="panel__overlay" :style="{ 'height': trueHeight + 'px' }" @click="onClickOverlay()"></div>
    </transition>
    <div class="burger" :class="{ 'burger--active': isOpen, }">
        <input type="checkbox" :class="{ 'burger__menu-toggle--open': isOpen, 'burger__menu-toggle': !isOpen }"
            @click="openCloseMenu()" />
        <label class="burger__menu-button-container" for="burger__menu-toggle">
            <div class="burger__menu-button"></div>
        </label>
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { resetDeck } from '../../Deck/deck';
import GithubButton from 'vue-github-button'

var isOpen = ref(false)
var isDesktop = ref(false)
var trueHeight = ref(window.innerHeight);
var showAbout = ref(false)

function aboutPopin() {
    //show the app informations
    showAbout.value = true;
}

function closeAboutPopin() {
    showAbout.value = false;

}

function openCloseMenu() {
    isOpen.value = !isOpen.value;

}

function clickReset() {
    resetDeck();
    isOpen.value = false;
}

window.addEventListener("resize", onResize);


function onResize() {
    trueHeight.value = window.innerHeight
    if (window.innerWidth >= 1280) {
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

    if (window.innerWidth >= 1280) {
        isDesktop.value = true;
    }

});

</script>
    
<style src="./Burger.css" >

</style>
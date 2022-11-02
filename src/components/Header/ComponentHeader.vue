<template>
    <div class="componentHeader">
        <Burger></Burger>
        <div class="componentHeader__title">
            <h1>EASY KANJI</h1>
        </div>
        <div @click="toggleFullScreen()" class="componentHeader__fullScreen">
            <full-screen></full-screen>

        </div>
    </div>
</template>
    
<script setup lang="ts">
import { download, deck } from '../Deck/deck';
import Download_img from './download_img.vue';
import Burger from './Burger/Burger.vue';
import fullScreen from '../icons/fullScreen.vue';

var isFullScreen = false;

const elem = document.getElementById("app");


function toggleFullScreen(){

    isFullScreen = !isFullScreen;

    if (elem === null) 
    {
        return ;
    }

    if (!isFullScreen)
    {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }



}


function onSave() {

    // download(JSON.stringify(deck.value), "myDeck.json", "text/plain");

}

</script>
    
<style src="./ComponentHeader.css" scoped>
</style>
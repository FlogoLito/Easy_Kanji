<template>
    <div class="componentHeader">
        <Burger></Burger>
        <div class="componentHeader__title">
            <h1>EASY KANJI</h1>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { download, deck } from '../Deck/deck';
import Download_img from './download_img.vue';
import Burger from './Burger/Burger.vue';


function onSave() {

    // download(JSON.stringify(deck.value), "myDeck.json", "text/plain");

}

</script>
    
<style src="./ComponentHeader.css" scoped>
</style>
<template>
    <div class="main-page">
        <h1>Prof Kanji</h1>

        <canvas id="can" class="main-page__canva" width="300" height="300"></canvas>
        <div class="main-page__buttons">
            <button class="maint-page__erase" @click="erase()">Erase</button>
            <button class="maint-page__undo" @click="undo()">Undo</button>
            <button class="maint-page__check" @click="check()">Check</button>
        </div>
        <div id="candidateList"></div>
    </div>
</template>
    
<script setup lang="ts">

import { onMounted } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'

let kanjiToMatch = "二"
type iKanjiCanvas = {

    recognize: (arg: string) => string;
    init: (arg: string) => void;
    deleteLast: (arg: string) => void;
    erase: (arg: string) => void;

}

const KanjiCanvas = modKanjiCanvas as unknown as iKanjiCanvas;

function check() {
    let result = KanjiCanvas.recognize('can');
    if (result.includes(kanjiToMatch)) {
        console.log("SUCCESS");
    }

    console.log(result);
}

function erase() {
    KanjiCanvas.erase('can');

}

function undo() {
    KanjiCanvas.deleteLast('can');
}

onMounted(() => {
    KanjiCanvas.init('can')
})
</script>
    
<style src="./MainPage.css" scoped >
</style>
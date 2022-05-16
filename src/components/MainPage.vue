<template>
    <div class="main-page">
        <h1>Easy Kanji</h1>
        <h2>{{ deck[0].translation }}</h2>

        <canvas id="can" class="main-page__canva" :width="heightCanvas" :height="widthCanvas"></canvas>
        <div class="main-page__buttons">
            <button class="maint-page__erase" @click="erase()">Erase</button>
            <button class="maint-page__undo" @click="undo()">Undo</button>
            <button class="maint-page__check" @click="check()">Check</button>
        </div>
        <div id="candidateList"></div>
    </div>
</template>
    
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'
import dicoN5 from '../../public/jlptn5.json'

var deck = ref(dicoN5.Jlptn5)

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var heightCanvas = 1000;
var widthCanvas = 1000;
var leapSuccess = 10;
var leapFail = 2;

var pencilSize = 40;

var state = { DrawKanji: 1, GuessKanji: 2, TryAgain: 3 }

type iKanjiCanvas = {

    recognize: (arg: string) => string;
    init: (arg: string) => void;
    deleteLast: (arg: string) => void;
    erase: (arg: string) => void;
}

// Cast type for typescript compliance
const KanjiCanvas = modKanjiCanvas as unknown as iKanjiCanvas;

function check() {
    var kanjiToGuess = deck.value[0].kanji;
    var result = KanjiCanvas.recognize('can');
    console.log(kanjiToGuess)
    if (result.includes(kanjiToGuess)) {
        console.log("SUCCESS");
        KanjiCanvas.erase('can');
        if (ctx !== null) {
            // Set it again because the recognize function changed it to draw 
            // the numbers
            ctx.lineWidth = pencilSize;
            putBack(leapSuccess);
        }
    }
    else {
        console.log("fail");
        erase();
        drawResult(kanjiToGuess);
    }

    console.log(result);
}

function drawResult(kanjiToGuess: string) {

    if (ctx === null) {
        throw console.error("canvas context null");
    }
    ctx.font = canvas.height * 0.7 + 'px bold serif';
    ctx.textBaseline = 'hanging'
    ctx.textAlign = 'center'
    ctx.strokeStyle = "grey"
    ctx.strokeText(kanjiToGuess, canvas.width / 2, canvas.height / 3);
    // Set again because recognize function changed it to draw 
    // the numbers
    ctx.lineWidth = pencilSize;

}

function putBack(leap: number) {
    // puts back the card in the deck
    // actually moving the card by leap in the array

    var card = deck.value.shift()
    if (card === undefined) {
        throw console.error("shift failed");
    }
    deck.value.splice(leap - 1, 0, card);

    console.log(deck)




}

function flipCard() {

}

function erase() {
    KanjiCanvas.erase('can');

}

function undo() {
    KanjiCanvas.deleteLast('can');
}

onMounted(() => {
    KanjiCanvas.init('can')

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
        console.log(Error)
        return;
    }


    ctx.lineWidth = pencilSize;


})
</script>
    
<style src="./MainPage.css" scoped >
</style>
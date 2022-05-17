<template>
    <div class="main-page">
        <h1>Easy Kanji</h1>

        <h2 v-if="!checkFliped">{{ deck[0].translation }}</h2>
        <h2 v-else="checkFliped">{{ deck[0].kanji }}</h2>

        <canvas id="can" class="main-page__canva" :width="heightCanvas" :height="widthCanvas"></canvas>
        <div class="main-page__buttons">
            <button class="main-page__erase" @click="erase()">Erase</button>
            <button class="main-page__undo" @click="undo()">Undo</button>

            <button v-if="!checkFliped" class="main-page__check" @click="check()">Check</button>
            <button class="main-page__next" @click="next()">Next</button>
        </div>
        <div id="candidateList"></div>
    </div>
</template>
    
<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'
import { deck, putBack, flipCard } from './Deck/deck'


var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var heightCanvas = 1000;
var widthCanvas = 1000;
var leapSuccess = 10;
var leapFail = 2;
var leapNext = leapSuccess

var pencilSize = 40;


enum State {
    drawKanjiState = "DrawKanjiState",
    guessKanjiState = "GuessKanjiState",
    findTradState = "FindTradState",
    tryAgainState = "TryAgainState"
}
var currentState = ref(State.drawKanjiState);


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

            // If the player failed, he can try again but the card will still
            // be pushed near and not flipped
            if (currentState.value === State.drawKanjiState) {
                flipCard();// flip the card
                putBack(leapSuccess);// and move it
            }
            else if (currentState.value === State.tryAgainState) {
                putBack(leapFail);
            }
            currentState.value = State.drawKanjiState;
        }
    }
    else {
        console.log("fail");
        erase();
        drawResult(kanjiToGuess);
        currentState.value = State.tryAgainState;
    }

    console.log(result);
    // mainState();
}

function drawResult(kanjiToGuess: string) {

    if (ctx === null) {
        throw console.error("canvas context null");
    }
    ctx.font = canvas.height * 0.7 + 'px bold serif';
    ctx.textBaseline = 'hanging'
    ctx.textAlign = 'center'
    // ctx.strokeStyle = "Gainsboro"
    ctx.fillStyle = "Gainsboro"
    ctx.fillText(kanjiToGuess, canvas.width / 2, canvas.height / 3);
    // Set again because recognize function changed it to draw 
    // the numbers
    ctx.lineWidth = pencilSize;

}

function next() {

    //When clicked, skip this card 
    putBack(leapNext);
    // mainState();

}

function erase() {
    KanjiCanvas.erase('can');
}

function undo() {
    KanjiCanvas.deleteLast('can');
}

function mainState() {
    // Check the card
    // if fliped, guess kanji
    // else, draw kanji

    // if (currentState.value === State.tryAgainState) {
    //     // The player can try again until success or next
    //     return;
    // }

    // if (deck.value[0].flip !== false || deck.value[0].flip === undefined) {
    //     //Show traduction and draw the kanji
    //     currentState.value = State.drawKanjiState;
    // }
    // else {
    //     //Show kanji and guess it
    //     currentState.value = State.guessKanjiState;
    // }
}


var checkFliped = computed(() => {
    if (deck.value[0].flip === undefined || deck.value[0].flip === false) {
        console.log("return false")
        return false;
    }
    else {
        console.log("return true")
        return true;
    }
}
)




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


    // mainState();

})
</script>
    
<style src="./MainPage.css" scoped >
</style>
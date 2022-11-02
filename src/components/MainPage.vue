<template>
    <div class="main-page">
        <ComponentHeader class="main-page__component-header"></ComponentHeader>

        <div class="main-page__card-container">
            <transition name="fade">
                <div class="main-page__card">
                    <div
                        class="main-page__container-canvas"
                        :class="{ 'main-page__container-canvas--rotate': rotateCanvas }"
                    >
                        <div v-if="checkFliped" class="main-page__translation">
                            <h2>{{ deck[0].translation }}</h2>
                        </div>
                        <canvas v-show="checkFliped" id="can" class="main-page__canvas"></canvas>
                        <!-- style=" width: 100%; height: auto;" -->
                        <div v-if="!checkFliped" class="main-page__kanji-div">
                            <div class="main-page__kanji-text">{{ deck[0].kanji }}</div>
                        </div>
                    </div>
                    <Verso
                        :prop="versoKanji"
                        class="main-page__verso"
                        :class="{
                            'main-page__verso--next': animNext,
                            'main-page__verso--rotate': rotateVerso,
                        }"
                    ></Verso>
                </div>
            </transition>
        </div>
        <div v-if="checkFliped" class="main-page__buttons">
            <div class="main-page__buttons-row">
                <button class="main-page__erase" @click="erase()">erase</button>
                <button class="main-page__undo" @click="undo()">undo</button>
                <button class="main-page__next" @click="next()">next</button>
            </div>
            <div class="main-page__buttons-center">
                <button v-if="checkFliped" class="main-page__check" @click="check()">CHECK</button>
            </div>
        </div>
        <div v-if="!checkFliped" class="main-page__answers">
            <button
                class="main-page__answers-buttons"
                v-for="answer in getAnswers"
                @click="checkAnswer(answer)"
            >{{ answer }}</button>
        </div>
        <transition name="fade">
            <div
                v-if="toggleVerify"
                class="main-page__overlay"
                :class="{
                    'main-page__overlay--good': isGoodAnswer,
                    'main-page__overlay--wrong': !isGoodAnswer,
                }"
            >
                <button class="main-page__overlay-button" @click="goNext(isGoodAnswer)">Next</button>
            </div>
        </transition>
        <!-- <transition name="fade">
        </transition>-->
    </div>
</template>
    
<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'
import { deck, success, failure, putBack, download } from './Deck/deck'
import Verso from './Card/Verso.vue'
import ComponentHeader from './Header/ComponentHeader.vue';


var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;



// var widthCanvas = document.documentElement.clientWidth * 0.5
// var heightCanvas = document.documentElement.clientHeight * 0.5



var pencilSize = 15;

var toggleVerify = ref(false)

var rotateCanvas = ref(false)
var rotateVerso = ref(false)

var isGoodAnswer = ref(false)

var animNext = ref(false)

var versoKanji = ref(deck.value[0])


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
    toggleVerify.value = true;
    versoKanji.value = deck.value[0];
    animNext.value = false;

    rotateCanvas.value = true;
    rotateVerso.value = true;
    if (result.includes(kanjiToGuess)) {
        console.log("SUCCESS");
        KanjiCanvas.erase('can');
        if (ctx !== null) {
            // Set it again because the recognize function changed it to draw 
            // the numbers
            ctx.lineWidth = pencilSize;
            isGoodAnswer.value = true;

        }
    }
    else {
        console.log("on est dans fail");
        erase();
        isGoodAnswer.value = false;
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
    KanjiCanvas.erase('can');
    putBack(10);
    //TODO : clarify next button
}

function erase() {
    KanjiCanvas.erase('can');
}

function undo() {
    KanjiCanvas.deleteLast('can');
}




function checkAnswer(answer: string) {
    toggleVerify.value = true;
    versoKanji.value = deck.value[0];
    animNext.value = false;

    rotateCanvas.value = true;
    rotateVerso.value = true;
    // setTimeout(() => {
    //     rotate.value = false;
    if (answer === deck.value[0].translation) {
        // good answer 
        isGoodAnswer.value = true;


        // change color to green
    }
    else {
        // wrong: show good answer before jump to next
        isGoodAnswer.value = false;
    }
    // }, 2000);
}

//when clicked on button next after answering
// Send verso to the left   
// flip the card
// make verso visible when click on answer
function goNext(isSuccess: boolean) {
    erase();
    animNext.value = true;
    toggleVerify.value = false;
    rotateCanvas.value = false;
    rotateVerso.value = false;

    // setTimeout(() => {
    //     rotate.value = false;
    //     // versoHidden.value = true;
    // }, 1500)
    if (isSuccess) {
        success();
    }
    else {
        failure();

    }
    setTimeout(() => {
        // animNext.value = false;
        // rotateVerso.value = false;
        // versoHidden.value = true;
    }, 1000)

    localStorage.setItem('myDeck', JSON.stringify(deck.value))
    console.log("tout s'est bien passé");

}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max + 1);
}


var getAnswers = computed(() => {
    var answers = [];

    // var goodAnswer = deck.value[0].translation;


    do {
        var wrongAnswer1 = getRandomInt(deck.value.length - 1)
        var wrongAnswer2 = getRandomInt(deck.value.length - 1)
        var wrongAnswer3 = getRandomInt(deck.value.length - 1)
    } while (wrongAnswer1 === wrongAnswer2
    || wrongAnswer1 === wrongAnswer3
        || wrongAnswer2 === wrongAnswer3
    )

    answers.push(deck.value[0].translation);
    answers.push(deck.value[wrongAnswer1].translation);
    answers.push(deck.value[wrongAnswer2].translation);
    answers.push(deck.value[wrongAnswer3].translation);

    return answers.sort((a, b) => 0.5 - Math.random());
})



var checkFliped = computed(() => {
    if (deck.value[0].flip === undefined || deck.value[0].flip === false) {
        return false;
    }
    else {
        return true;
    }
}
)

onMounted(() => {


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

    // get the deck from localStorage if there is one
    var stringDeck = localStorage.getItem('myDeck')
    if (stringDeck !== null) {
        deck.value = JSON.parse(stringDeck);
    }

    ctx.canvas.width = innerWidth - 70; // substract the double of the border width
    ctx.canvas.height = innerHeight * 0.6 - 70;
    
    if (innerWidth > 750){
        ctx.canvas.width = 750;
    }

    // console.log(ctx.canvas.height);
    // console.log(canvas.getBoundingClientRect().height)

    KanjiCanvas.init('can')

    ctx.lineWidth = pencilSize;


    // mainState();

})
</script>
    
<style src="./MainPage.css" scoped >
</style>
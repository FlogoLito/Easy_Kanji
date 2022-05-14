<template>
    <div class="main-page">
        <h1>Prof Kanji</h1>

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

import { onMounted } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'
import dicoN5 from '../../public/jlptn5.json'

var tableN5 = dicoN5.Jlptn5

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var heightCanvas = 1000;
var widthCanvas = 1000;

var pencilSize = 40;

type iKanjiCanvas = {

    recognize: (arg: string) => string;
    init: (arg: string) => void;
    deleteLast: (arg: string) => void;
    erase: (arg: string) => void;
}

// Cast type for typescript compliance
const KanjiCanvas = modKanjiCanvas as unknown as iKanjiCanvas;

function check() {
    var result = KanjiCanvas.recognize('can');
    var kanjiToMatch = tableN5[0].kanji;
    if (result.includes(kanjiToMatch)) {
        console.log("SUCCESS");
        if (ctx !== null) {
            // Set again because recognize function changed it to draw 
            // the numbers
            ctx.lineWidth = pencilSize;
        }
    }
    else {
        console.log("fail");
        erase();
        drawResult(kanjiToMatch);
    }

    console.log(result);
}

function drawResult(kanjiToMatch: string) {

    if (ctx === null) {
        throw console.error("canvas context null");
    }
    ctx.font = canvas.height * 0.7 + 'px bold serif';
    ctx.textBaseline = 'hanging'
    ctx.textAlign = 'center'
    ctx.strokeStyle = "grey"
    ctx.strokeText(kanjiToMatch, canvas.width / 2, canvas.height / 3);
    // Set again because recognize function changed it to draw 
    // the numbers
    ctx.lineWidth = pencilSize;


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
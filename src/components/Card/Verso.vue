!<template>
    <div class="verso">
        <h1 class="verso__title">{{ prop.translation }}</h1>
        <div class="verso__kanji-div" :style="{ 'width': canvaWidth + 'px'}">
            <!-- <div class="verso__kanji-text">{{ prop.kanji }}</div> -->
            <canvas  id="verso_canva"></canvas>
        </div>
        <div class="verso__kanas">
            <div class="verso__onyomi-kunyomi">
                <h2 class="verso__h2">onyomi</h2>
                <div>{{ prop.onyomi.romaji }}</div>
                <div>{{ prop.onyomi.kana }}</div>
            </div>
            <div class="verso__onyomi-kunyomi">
                <h2 class="verso__h2">kunyomi</h2>
                <div>{{ prop.kunyomi.romaji }}</div>
                <div>{{ prop.kunyomi.kana }}</div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import { modKanjiCanvas } from '../KanjiCanvaWraper'
import { kanjiCard } from '../Deck/deck';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var pencilSize = 10;

var canvaWidth = ref(innerWidth * 0.66)
var canvaHeight = ref(innerHeight * 0.4)

interface Card extends kanjiCard {
    required?: true,
    // extends nothing but due to vue's limitations, we can't import interface to 
    // define props
    //https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
}

type iKanjiCanvas = {

    recognize: (arg: string) => string;
    init: (arg: string) => void;
    deleteLast: (arg: string) => void;
    erase: (arg: string) => void;
}

// Cast type for typescript compliance
const KanjiCanvas = modKanjiCanvas as unknown as iKanjiCanvas;

// const card = defineProps<Card>()

const props = defineProps<{ prop: Card }>()

function drawResult(kanjiToGuess: string) {

    console.log(kanjiToGuess)
    if (canvas === undefined) {
        throw console.error("canvas undefined")
    }
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
onUpdated(() => {
    KanjiCanvas.erase('verso_canva');
    drawResult(props.prop.kanji)
})



window.addEventListener("resize", onResize);

function onResize() {
    // canvaWidth.value = window.innerWidth - 70;
    // canvaHeight.value = window.innerHeight / 2 - 70;
}


onMounted(() => {
    try {
        canvas = document.getElementById('verso_canva') as HTMLCanvasElement;
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
    // cssVarBorderWidth = 10;
    console.log(canvaWidth.value);
    console.log(canvaHeight.value);
    ctx.canvas.width = canvaWidth.value; // substract the double of the border width
    ctx.canvas.height = canvaHeight.value;

    KanjiCanvas.init('verso_canva')

    ctx.lineWidth = pencilSize;

})

</script>
    
<style src="./Verso.css" scoped>
</style>
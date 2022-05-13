<template>
    <div class="main-page">
        <h1>Prof Kanji</h1>

        <canvas id="can" class="main-page__canva" width="300" height="300"></canvas>
        <div class="main-page__buttons">
            <!-- <button class="maint-page__erase" @click="erase()">Erase</button>
            <button class="maint-page__undo" @click="undo()">Undo</button>-->
            <button class="maint-page__check" @click="check()">Check</button>
        </div>
        <div id="candidateList"></div>
    </div>
</template>
    
<script setup lang="ts">

// import * as test from '../../kanjicanvas/docs/resources/javascript/kanji-canvas.min.js'
// import '../../kanjicanvas/docs/resources/javascript/ref-patterns.js'

import { inject, onMounted } from 'vue'
import { modKanjiCanvas } from './KanjiCanvaWraper'

// const KanjiCanvas = inject('KanjiCanvas')
let kanjiToMatch = "二"

function check() {
    let result = modKanjiCanvas.recognize('can');
    if (result.includes(kanjiToMatch)) {
        console.log("SUCCESS");
    }

    console.log(result);
}

onMounted(() => {

    modKanjiCanvas.init('can')
    console.log("on est dans onmounted")
})
// export {
//     inject: ['KanjiCanvas'],
//         data() {
//     return {
//         kanjiToMatch: "二",

//     }
// },
// methods: {
//     erase() {
//         this.KanjiCanvas.erase('can');
//     },
//     undo() {
//         this.KanjiCanvas.deleteLast('can');
//     },
//     check() {
//         let result = this.KanjiCanvas.recognize('can');
//         if (result.includes(this.kanjiToMatch)) {
//             console.log("SUCCESS");
//         }

//         console.log(result);
//     }

// },
// mounted() {
//     console.log("on est ici")
//     // console.log(this.$kanjiCanvas)
//     // this.kanjiCanvas = this.$kanjiCanvas;
//     this.KanjiCanvas.init('can');

// }
// }
</script>
    
<style src="./MainPage.css" scoped >
</style>
!<template>
    <div class="verso">
        <h1 class="verso__title">{{ prop.translation }}</h1>
        <div class="verso__kanji-div">
            <div class="verso__kanji-text">{{ prop.kanji }}</div>
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
import { flipCard, kanjiCard } from '../Deck/deck';

interface Card extends kanjiCard {
    required?: true,
    // extends nothing but due to vue's limitations, we can't import interface to 
    // define props
    //https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
}


// const card = defineProps<Card>()

defineProps<{ prop: Card }>()



</script>
    
<style src="./Verso.css" scoped>
</style>
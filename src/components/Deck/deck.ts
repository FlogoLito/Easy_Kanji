import dicoN5 from '../../../public/jlptn5.json'
import {ref} from 'vue'

export type kanjiCard = {
    kanji: string;
    onyomi: {
        romaji: string;
        kana: string ;
    }
    kunyomi: {
        romaji: string | null ;
        kana: string | null;
    }
    translation: string;
    flip?: boolean;
    counter?: number;

};

var leapSuccess = 10;
var leapFail = 2;
var leapNext = leapSuccess

export var deck = ref(dicoN5.Jlptn5 as kanjiCard[]);

export function success(){
    flipCard();
    increaseCounter();
    putBack(leapSuccess);
}

export function failure() {
    decreaseCounter();
    putBack(leapFailure);
}

export function putBack(leap: number) {
    // puts back the card in the deck
    // actually moving the card by leap in the array

    var card = deck.value.shift()
    if (card === undefined) {
        throw console.error("shift failed");
    }

    if(card.counter !== undefined)
    {
        leap += card.counter*card.counter;
    }


    deck.value.splice(leap - 1, 0, card);

    console.log(deck)

}

export function flipCard() {
    // flip the card so the next time you see it, 
    // it will be a kanji to guess or vice versa

    if (deck.value[0].flip === undefined)
    {
        deck.value[0].flip = true;
    }
    else {
        deck.value[0].flip != deck.value[0].flip;
    }


}

export function increaseCounter() {

    var card = ref(deck.value[0])

    if (card.value.counter !== undefined) {
        card.value.counter++;
    }
    else {
        card.value.counter = 1;
    }
}


export function decreaseCounter() {

    var card = ref(deck.value[0])

    if (card.value.counter !== undefined) {
        card.value.counter--;
        if (card.value.counter < 0) {
            card.value.counter = 0;
        }
    }
    else {
        card.value.counter = 0;
    }
}
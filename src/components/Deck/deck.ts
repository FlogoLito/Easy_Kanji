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

};


export var deck = ref(dicoN5.Jlptn5 as kanjiCard[]);

export function putBack(leap: number) {
    // puts back the card in the deck
    // actually moving the card by leap in the array

    var card = deck.value.shift()
    if (card === undefined) {
        throw console.error("shift failed");
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
import { guessWordHangedManGame } from "../apis/GuessWordHangedManGame";

guessWordHangedManGame("hello").then((res) => {
    console.log(res);
})
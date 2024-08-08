import { getRandomTriviaQuestion } from "../../services/Gemini.service";

getRandomTriviaQuestion().then((question) => {
    console.log(question);
})
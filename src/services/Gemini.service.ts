import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set temperature to 0.0 to get deterministic results


export async function isMischangingThaiLanguage(text: string) {

    const prompt = `
        Classify the following texts whether it is a Thai text that were type before changing the language or not. Please answer only TRUE if it is a Thai text that were type before changing the language, otherwise answer FALSE.

        Here is an example:

        <INPUT>: [hkoxjkivp9jv
        <OUTPUT>: TRUE
        This is likely correct. The string is a combination of random letters, numbers, and brackets. This pattern is common in text that has been mistranslated or where the language has been altered unintentionally.

        <INPUT>: บ้านป่ารอยต่อ
        <OUTPUT>: FALSE
        This is a valid Thai phrase meaning "forest border house."

        <INPUT>: Fvg8
        <OUTPUT>: TRUE
        This is likely correct.  Similar to the first example, it appears to be a random combination of letters and numbers.

        <INPUT>: antidisestablishmentarianism
        <OUTPUT>: FALSE
        This is an English word.
        
        <INPUT>: misstyong
        <OUTPUT>: FALSE
        While it might resemble Thai, it's not a recognized Thai word. It's possible it's a misspelling of an English word.

        Now it's your turn to classify the following texts:
        <INPUT>: ${text}
        <OUTPUT>:
    `
  
    const { response } = await model.generateContent(prompt);
    return response.text().includes("TRUE");
}

export async function isMeaningfulThaiLanguage(text: string) {
    const prompt = `
        Look at the following Thai text and decide if it is meaningful or not, a little bit of mispelling or mistyping can be forgived and decide as a meaningful text. Please answer YES if it is meaningful, otherwise answer NO. Always answer NO if there is any Thai character.
        ${text}
    `

    const { response } = await model.generateContent(prompt);
    return response.text().includes("YES");
}

export async function getIceBreakingQuestion() {
    const prompt = `
        Give me one icebreaking question for streamer to have a chat with viewer. Please answer only the question and it should not include any parameter to be filled.
    `

    const { response } = await model.generateContent(prompt);
    return response.text();
}

export async function getRandomTriviaQuestion() {
    const prompt = "Give me one random information that rarely prople know, it may be truth or not. Also give me the answer if it is a truth or not. Please answer as a Thai language. Your answer should be in the following format: <คำถาม>|<TRUE/FALSE>|<คำอธิบาย>. Answer should not contain new line"

    const { response } = await model.generateContent(prompt);
    return response.text();
}
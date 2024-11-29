import { prisma } from "../../../database/prisma";
import { getEnglishWordClue } from "../../../services/Gemini.service";
import { CommonEnglishWordList } from "../constants/CommonEnglishWordList.constant";
import { GEMINI_OUT_OF_SERVICE_TEXT } from "../constants/Wording";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function createHangedManGame(guessCount: number) {

    const words = CommonEnglishWordList.filter((word) => word.length >= 4);

	const word = words[Math.floor(Math.random() * words.length)];

	await prisma.hangedManGame.updateMany({
		where: {
			isResolved: false,
		},
		data: {
			isResolved: true,
		},
	});

    let clue = "";
    try {
        clue = await getEnglishWordClue(word);
    } catch (error) {
        clue = GEMINI_OUT_OF_SERVICE_TEXT;
    }

	const result = await prisma.hangedManGame.create({
		data: {
			word: word.toLowerCase(),
            guessesLeft: guessCount,
			currentWordState: word
				.split("")
				.map(() => "_")
				.join(""),
            clue: clue,
		},
	});

    return transformHangedManGameToDisplayText(result);
}

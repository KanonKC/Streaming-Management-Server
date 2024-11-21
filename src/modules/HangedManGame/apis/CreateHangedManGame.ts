import { prisma } from "../../../database/prisma";
import { getEnglishWordClue } from "../../../services/Gemini.service";
import { CommonEnglishWords } from "../constants/CommonEnglishWords.constant";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function createHangedManGame(guessCount: number) {

    const words = CommonEnglishWords.filter((word) => word.length >= 3);

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
        clue = "Gemini ล่มอยู่ ไม่มีคำใบ้ให้นะ TT"
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

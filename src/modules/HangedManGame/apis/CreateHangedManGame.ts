import { prisma } from "../../../database/prisma";
import { CommonEnglishWords } from "../constants/CommonEnglishWords.constant";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function createHangedManGame(guessCount: number) {
	const words = CommonEnglishWords;

	const word = words[Math.floor(Math.random() * words.length)];

	await prisma.hangedManGame.updateMany({
		where: {
			isResolved: false,
		},
		data: {
			isResolved: true,
		},
	});

	const result = await prisma.hangedManGame.create({
		data: {
			word: word.toLowerCase(),
            guessesLeft: guessCount,
			currentWordState: word
				.split("")
				.map(() => "_")
				.join(""),
		},
	});

    return transformHangedManGameToDisplayText(result);
}

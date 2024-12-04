import { prisma } from "../../../database/prisma";
import { addCustomPoint } from "../../CustomPoint/apis/AddCustomPoint";
import { GEMINI_OUT_OF_SERVICE_TEXT } from "../constants/Wording";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function guessWordHangedManGame(
	word: string,
	twitchUserId: string,
	twitchUsername: string
) {
	const hangedMan = await prisma.hangedManGame.findFirst({
		where: {
			isResolved: false,
		},
	});

	if (!hangedMan) {
		return { code: "NOT_FOUND" };
	}

	if (hangedMan.word === word.toLowerCase()) {
		const resolvedResult = await prisma.hangedManGame.update({
			where: {
				id: hangedMan.id,
			},
			data: {
				isResolved: true,
				currentWordState: hangedMan.word,
			},
		});

        let score = hangedMan.currentWordState.split("").filter((char) => char === "_").length
        if (hangedMan.guessesLeft === 1 && hangedMan.clue !== GEMINI_OUT_OF_SERVICE_TEXT) {
            score = Math.ceil(score / 2)
        }

        await prisma.hangedManGameAttemptedLog.create({
            data: {
                hangedManGameId: hangedMan.id,
                guess: word,
                guessType: "word",
                twitchUserId,
                twitchUsername,
                isCorrect: true,
                score: score,
            }
        })

        addCustomPoint(twitchUserId, score*3)

		return {
			code: "CORRECT_RESOLVED",
            score,
			...transformHangedManGameToDisplayText(resolvedResult),
		};
	} else {
		const result = await prisma.hangedManGame.update({
			where: {
				id: hangedMan.id,
			},
			data: {
				guessesLeft: hangedMan.guessesLeft - 1,
			},
		});
		if (result.guessesLeft === 0) {
			const resolvedResult = await prisma.hangedManGame.update({
				where: {
					id: hangedMan.id,
				},
				data: {
					isResolved: true,
					currentWordState: hangedMan.word,
				},
			});
			return {
				code: "GAME_OVER",
				...transformHangedManGameToDisplayText(resolvedResult),
			};
		} else {
			return {
				code: "INCORRECT_GUESSED",
				...transformHangedManGameToDisplayText(result),
			};
		}
	}
}

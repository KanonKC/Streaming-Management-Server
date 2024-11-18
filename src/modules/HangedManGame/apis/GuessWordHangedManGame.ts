import { prisma } from "../../../database/prisma";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function guessWordHangedManGame(word: string) {
	const hangedMan = await prisma.hangedManGame.findFirst({
		where: {
			isResolved: false,
		},
	});

	if (!hangedMan) {
		return { code: "NOT_FOUND" };
	}

	if (hangedMan.word === word) {
		const resolvedResult = await prisma.hangedManGame.update({
			where: {
				id: hangedMan.id,
			},
			data: {
				isResolved: true,
			},
		});

		return {
			code: "CORRECT_RESOLVED",
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
				guessesLeft: result.guessesLeft,
			};
		}
	}
}

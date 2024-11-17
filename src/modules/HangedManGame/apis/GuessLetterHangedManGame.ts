import { prisma } from "../../../database/prisma";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function guessLetterHangedManGame(letter: string) {
	const hangedMan = await prisma.hangedManGame.findFirst({
		where: {
			isResolved: false,
		},
	});

	if (!hangedMan) {
		return { code: "NOT_FOUND" };
	}

	if (hangedMan.word.includes(letter)) {
		if (hangedMan.correctGuessedLetters.includes(letter)) {
			return { code: "ALREADY_GUESSED" };
		} else {
			const { currentWordState } = hangedMan;
			const newWordState = currentWordState
				.split("")
				.map((char, index) =>
					hangedMan.word[index] === letter ? letter : char
				)
				.join("");

			const result = await prisma.hangedManGame.update({
				where: {
					id: hangedMan.id,
				},
				data: {
					currentWordState: newWordState,
					correctGuessedLetters: [
						...hangedMan.correctGuessedLetters,
						letter,
					].join(","),
				},
			});

			if (result.word === result.currentWordState) {
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
			}

			return {
				code: "CORRECT_GUESSED",
				...transformHangedManGameToDisplayText(result),
			};
		}
	} else {
		const result = await prisma.hangedManGame.update({
			where: {
				id: hangedMan.id,
			},
			data: {
				incorrectGuessedLetters: [
					...hangedMan.incorrectGuessedLetters,
					letter,
				].join(","),
			},
		});

		return {
			code: "INCORRECT_GUESSED",
			...transformHangedManGameToDisplayText(result),
		};
	}
}

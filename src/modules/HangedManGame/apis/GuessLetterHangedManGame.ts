import { prisma } from "../../../database/prisma";
import { transformHangedManGameToDisplayText } from "../utils/TransformHangedManGameToDisplayText";

export async function guessLetterHangedManGame(
	letter: string,
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

	// Regex only a to Z
	const isValidInput = new RegExp("^[a-zA-Z]$").test(letter);

	if (letter.length !== 1 || !isValidInput) {
		return { code: "INVALID_INPUT" };
	}

	letter = letter.toLowerCase();

	if (
		(hangedMan.word.includes(letter) &&
			hangedMan.correctGuessedLetters.includes(letter)) ||
		hangedMan.incorrectGuessedLetters.includes(letter)
	) {
		return {
			code: "ALREADY_GUESSED",
			...transformHangedManGameToDisplayText(hangedMan),
		};
	} else if (hangedMan.word.includes(letter)) {
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
				].join(""),
			},
		});

		await prisma.hangedManGameAttemptedLog.create({
			data: {
				hangedManGameId: hangedMan.id,
				guess: letter,
				guessType: "letter",
				twitchUserId,
				twitchUsername,
				isCorrect: true,
				score: 1,
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
				score: 1,
				...transformHangedManGameToDisplayText(resolvedResult),
			};
		}

		return {
			code: "CORRECT_GUESSED",
			score: 1,
			...transformHangedManGameToDisplayText(result),
		};
	} else {
		const result = await prisma.hangedManGame.update({
			where: {
				id: hangedMan.id,
			},
			data: {
				guessesLeft: hangedMan.guessesLeft - 1,
				incorrectGuessedLetters: [
					...hangedMan.incorrectGuessedLetters,
					letter,
				].join(""),
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
		}

		return {
			code: "INCORRECT_GUESSED",
			...transformHangedManGameToDisplayText(result),
		};
	}
}

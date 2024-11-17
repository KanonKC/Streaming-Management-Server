import { HangedManGame } from "@prisma/client";

export function transformHangedManGameToDisplayText(
	hangedManGame: HangedManGame
) {
	return {
		currentWordState: hangedManGame.currentWordState.split("").join(" "),
		incorrectGuessedLetters: hangedManGame.incorrectGuessedLetters
			.split(",")
			.join(""),
		totalIncorrect: hangedManGame.incorrectGuessedLetters.split(",").length,
	};
}

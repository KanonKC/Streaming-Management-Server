import { HangedManGame } from "@prisma/client";

export function transformHangedManGameToDisplayText(
	hangedManGame: HangedManGame
) {
	return {
        ...hangedManGame,
		currentWordStateDisplay: hangedManGame.currentWordState.toUpperCase().split("").join(" "),
		incorrectGuessedLettersDisplay: hangedManGame.incorrectGuessedLetters
            .toUpperCase()
			.split("")
            .sort((a, b) => a.localeCompare(b))
			.join(" "),
	};
}

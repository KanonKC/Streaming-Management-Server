import { HangedManGame } from "@prisma/client";

export function transformHangedManGameToDisplayText(
	hangedManGame: HangedManGame
) {
   
    const currentWordStateDisplay = hangedManGame.currentWordState.toUpperCase().split("").join(" ")
    const incorrectGuessedLettersDisplay = hangedManGame.incorrectGuessedLetters
            .toUpperCase()
			.split("")
            .sort((a, b) => a.localeCompare(b))
			.join(" ")
    let gameCurrentStateDisplay = `📝 ${currentWordStateDisplay} | ❌ ${incorrectGuessedLettersDisplay} | ❤ ${hangedManGame.guessesLeft}`
    // if (hangedManGame.guessesLeft === 1) {
    //     gameCurrentStateDisplay = gameCurrentStateDisplay + ` | คำใบ้: ${hangedManGame.clue}`
    // }

	return {
        ...hangedManGame,
        wordLength: hangedManGame.word.length,
        wordFirstCapital: hangedManGame.word.charAt(0).toUpperCase() + hangedManGame.word.slice(1),
		currentWordStateDisplay,
		incorrectGuessedLettersDisplay,
        gameCurrentStateDisplay,
	};
}

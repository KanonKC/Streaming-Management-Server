import { prisma } from "../../../database/prisma";

export async function guessWordHangedManGame(word: string) {
    const hangedMan = await prisma.hangedManGame.findFirst({
        where: {
            isResolved: false,
        }
    })

    if (!hangedMan) {
        return { code: "NOT_FOUND" }
    }

    if (hangedMan.word === word) {
        const resolvedResult = await prisma.hangedManGame.update({
            where: {
                id: hangedMan.id
            },
            data: {
                isResolved: true
            }
        })

        return { code: "CORRECT_RESOLVED", currentWordState: resolvedResult.word }
    } else {
        const result = await prisma.hangedManGame.update({
            where: {
                id: hangedMan.id
            },
            data: {
                incorrectGuessedLetters: [...hangedMan.incorrectGu
}
import { prisma } from "../../../database/prisma";

export interface ResolveSmallMathGamePayload {
    twitchUserId: string;
    twitchUsername: string;
    guess: string;
}

export async function resolveSmallMathGame(payload: ResolveSmallMathGamePayload) {
    const game = await prisma.mathGame.findFirstOrThrow({
        where: {
            isResolved: false,
        },
    })

    let guess: number;

    try {
        guess = parseInt(payload.guess);
    } catch {

        await prisma.mathGameGuessLog.create({
            data: {
                isCorrect: false,
                guess: payload.guess,
                mathGameId: game.id,
                twitchUserId: payload.twitchUserId,
                twitchUsername: payload.twitchUsername,
            },
        })

        return { code: "INVALID_GUESS" };
    }

    let isCorrect = guess === game.answer

    await prisma.mathGameGuessLog.create({
        data: {
            isCorrect,
            guess: payload.guess,
            mathGameId: game.id,
            twitchUserId: payload.twitchUserId,
            twitchUsername: payload.twitchUsername,
        },
    })

    if (isCorrect) {
        await prisma.mathGame.update({
            where: {
                id: game.id,
            },
            data: {
                resolveTwitchUserId: payload.twitchUserId,
                resolveTwitchUsername: payload.twitchUsername,
                isResolved: true,
            },
        })

        const correctCount = await prisma.mathGameGuessLog.count({
            where: {
                isCorrect: true,
                twitchUserId: payload.twitchUserId,
            },
        })

        return { code: "CORRECT_GUESS", correctCount };
    } else {
        return { code: "INCORRECT_GUESS" };
    }

} 
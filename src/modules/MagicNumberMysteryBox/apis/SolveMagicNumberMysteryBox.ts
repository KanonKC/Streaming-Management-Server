import { prisma } from "../../../database/prisma";
import { SolveMagicNumberMysteryBoxPayload } from "../types/MagicNumberMysteryBox.type";

export async function solveMagicNumberMysteryBox(
    twitchRewardId: string,
    payload: SolveMagicNumberMysteryBoxPayload
) {

    const { twitchUserId, twitchUsername, guessNumber } = payload

    const mysteryBox = await prisma.magicNumberMysteryBox.findFirst({
        where: {
            twitchRewardId,
            isActive: true
        }
    })

    if (!mysteryBox) {
        return { code: "BOX_NOT_FOUND" }
    }

    if (guessNumber < mysteryBox.possibleMinNumber || guessNumber > mysteryBox.possibleMaxNumber) {
        return { code: "OUT_OF_RANGE", guessNumber, ...mysteryBox }
    }

    if (guessNumber === mysteryBox.correctNumber) {
        const response = await prisma.magicNumberMysteryBox.update({
            where: {
                id: mysteryBox.id
            },
            data: {
                isActive: false,
                winnerUserId: twitchUserId,
                winnerUsername: twitchUsername
            }
        })

        return { code: "SUCCESS", ...response }
    }
    else if (guessNumber < mysteryBox.correctNumber) {
        const response = await prisma.magicNumberMysteryBox.update({
            where: {
                id: mysteryBox.id
            },
            data: {
                possibleMinNumber: guessNumber + 1
            }
        })
        return { code: "NUMBER_TOO_LOW", guessNumber, ...response }
    }
    else if (guessNumber > mysteryBox.correctNumber) {
        const response = await prisma.magicNumberMysteryBox.update({
            where: {
                id: mysteryBox.id
            },
            data: {
                possibleMaxNumber: guessNumber - 1
            }
        })
        return { code: "NUMBER_TOO_HIGH", guessNumber, ...response }
    }
}
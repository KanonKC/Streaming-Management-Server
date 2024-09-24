import { prisma } from "../../database/prisma";
import { SolveMagicNumberMysteryBoxPayload } from "../../types/MagicNumberMysteryBox.type";

export async function createMagicNumberMysteryBox(
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
        return { code: "OUT_OF_RANGE", ...mysteryBox }
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
                possibleMinNumber: guessNumber
            }
        })
        return { code: "NUMBER_TOO_LOW", response }
    }
    else if (guessNumber > mysteryBox.correctNumber) {
        const response = await prisma.magicNumberMysteryBox.update({
            where: {
                id: mysteryBox.id
            },
            data: {
                possibleMaxNumber: guessNumber
            }
        })
        return { code: "NUMBER_TOO_HIGH", response }
    }
}
import { prisma } from "../../database/prisma";
import { CreateMagicNumberMysteryBoxPayload } from "../../types/MagicNumberMysteryBox.type";

export async function createMagicNumberMysteryBox(
    twitchRewardId: string,
    payload?: CreateMagicNumberMysteryBoxPayload
) {
    let maxNumber = payload?.maxNumber || 100;
    let minNumber = payload?.minNumber || 0;
    let correctNumber = payload?.correctNumber || Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    return prisma.magicNumberMysteryBox.create({
        data: {
            twitchRewardId,
            minNumber,
            maxNumber,
            possibleMinNumber: minNumber,
            possibleMaxNumber: maxNumber,
            correctNumber
        }
    })
}
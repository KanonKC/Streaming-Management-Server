import { prisma } from "../../../database/prisma"

export async function removeCustomPoint(twitchUserId: string, amount: number) {
    
    const currentCustomPoint = await prisma.customPoint.findUnique({
        where: { twitchUserId }
    })

    if (!currentCustomPoint) {
        throw new Error("Account doesn't exist.")
    }
    else if (currentCustomPoint.point < amount) {
        throw new Error("Not enough Custom Point.")
    }
    else {
        return await prisma.customPoint.update({
            where: { twitchUserId },
            data: {
                point: currentCustomPoint.point - amount
            },
        })
    }
}
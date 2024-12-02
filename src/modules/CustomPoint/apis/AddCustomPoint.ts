import { prisma } from "../../../database/prisma";

export async function addCustomPoint(twitchUserId: string, amount: number) {
    
    const currentCustomPoint = await prisma.customPoint.findUnique({
        where: { twitchUserId }
    })

    if (!currentCustomPoint) {
        return await prisma.customPoint.create({
            data: {
                twitchUserId,
                point: amount
            },
        })
    } else {
        return await prisma.customPoint.update({
            where: { twitchUserId },
            data: {
                point: currentCustomPoint.point + amount
            },
        })
    }
}
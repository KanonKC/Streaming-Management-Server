import { prisma } from "../../../database/prisma";

export async function getCustomPoint(twitchUserId: string) {
    
    return prisma.customPoint.findUnique({
        where: { twitchUserId }
    })

}
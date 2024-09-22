import { prisma } from "../../database/prisma";

export async function addKillerRequest(twitchUserId: string, twitchUsername: string, description: string) {
    const queue = await prisma.killerRequestQueue.create({
        data: {
            twitchUserId,
            twitchUsername,
            description
        }
    })
    
    const totalQueue = await prisma.killerRequestQueue.count({
        where: {
            isActive: true
        }
    })

    return { ...queue, totalQueue }
}
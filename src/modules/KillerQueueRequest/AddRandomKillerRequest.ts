import { DBDKillerList } from "../../constants/DbdKiller.constant";
import { prisma } from "../../database/prisma";

export async function addRandomKillerRequest(twitchUserId: string, twitchUsername: string) {
    
    const randomKiller = DBDKillerList[Math.floor(Math.random() * DBDKillerList.length)]

    const queue = await prisma.killerRequestQueue.create({
        data: {
            twitchUserId,
            twitchUsername,
            description: randomKiller,
        }
    })
    
    const totalQueue = await prisma.killerRequestQueue.count({
        where: {
            isActive: true
        }
    })

    return { ...queue, totalQueue }
}
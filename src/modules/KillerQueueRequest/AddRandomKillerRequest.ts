import { DBDKillerList } from "../../constants/DbdKiller.constant";
import { prisma } from "../../database/prisma";

export async function addRandomKillerRequest(twitchUserId: string, twitchUsername: string) {
    
    const currentRandomKillers = await prisma.killerRequestQueue.findMany({
        where: {
            isActive: true,
            isRandom: true
        }
    })

    const filteredRandomKillers = DBDKillerList.filter(killer => !currentRandomKillers.some(currentKiller => currentKiller.description === killer))
    const randomKiller = filteredRandomKillers[Math.floor(Math.random() * filteredRandomKillers.length)]

    const queue = await prisma.killerRequestQueue.create({
        data: {
            twitchUserId,
            twitchUsername,
            description: randomKiller,
            isRandom: true,
        }
    })
    
    const totalQueue = await prisma.killerRequestQueue.count({
        where: {
            isActive: true
        }
    })

    return { ...queue, totalQueue }
}
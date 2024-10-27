import { prisma } from "../../../database/prisma";
import { getKillerRequestQueues } from "./GetKillerRequestQueues";

export async function markKillerRequestAsDone(index: number) {
    const queues = await prisma.killerRequestQueue.findMany({
        where: {
            isActive: true
        }
    });

    if (queues.length === 0) {
        return { nextQueue: null, totalQueue: 0 }
    }

    
    await prisma.killerRequestQueue.update({
        where: {
            id: queues[index].id
        },
        data: {
            isActive: false
        }
    })

    if (queues.length === 1) {
        return { nextQueue: null, totalQueue: 0 }
    }

    const nextQueue = await prisma.killerRequestQueue.findFirst({
        where: {
            id: queues[index+1].id
        },
    })

    const twitchText = await getKillerRequestQueues()

    return { nextQueue, ...twitchText }
}
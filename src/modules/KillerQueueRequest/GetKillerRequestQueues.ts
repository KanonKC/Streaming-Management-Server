import { prisma } from "../../database/prisma";

export async function getKillerRequestQueues() {
    const queues = await prisma.killerRequestQueue.findMany({
        where: {
            isActive: true
        }
    });

    const totalQueue = queues.length;

    if (totalQueue === 0) {
        return { totalQueue, currentDescriptionText: '', nextDescriptionText: '' }
    }

    const currentDescriptionText = queues[0].description;

    if (totalQueue === 1) {
        return { totalQueue, currentDescriptionText, nextDescriptionText: '' }
    }

    const nextDescriptionText = queues.slice(1).map((queue) => queue.description).join(' -> ')
    return { totalQueue, currentDescriptionText, nextDescriptionText };
}
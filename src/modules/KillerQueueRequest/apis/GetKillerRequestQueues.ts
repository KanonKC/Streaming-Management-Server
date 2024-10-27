import { prisma } from "../../../database/prisma";

const QueueShowCount = 5;

export async function getKillerRequestQueues() {

    const killerRequestQueueList = await prisma.killerRequestQueue.findMany({
        where: {
            isActive: true
        }
    })

    const totalQueue = killerRequestQueueList.length;
    const partialKillerQueueList = killerRequestQueueList.slice(0, QueueShowCount);

    const rewardDescriptionText = `(คิวตอนนี้: ${partialKillerQueueList.map((queue) => `${queue.description}`).join(' > ')})`;

    let queueListText = '';

    if (totalQueue === 0) {
        queueListText = 'ไม่มีคิวแล้ว อยากทำไรทำเลย';
    }
    else {
        const partialKillerQueueTextList = partialKillerQueueList.map((queue) => `${queue.description} (by ${queue.twitchUsername})`)

        if (totalQueue > QueueShowCount) {
            partialKillerQueueTextList.push(`... และอีก ${totalQueue - QueueShowCount} คิว`);
        }
        
        queueListText = `คิวทั้งหมด(${totalQueue}): ${partialKillerQueueTextList.join(' -> ')}`;
    }

    const nextQueueText = totalQueue === 0 ? 'ไม่มีคิวแล้ว อยากทำไรทำเลย' : `คิวถัดไป -> ${killerRequestQueueList[0].description}`;

    return { totalQueue, rewardDescriptionText, nextQueueText, queueListText };

}
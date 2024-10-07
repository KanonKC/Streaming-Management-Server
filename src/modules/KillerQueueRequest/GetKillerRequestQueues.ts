import { prisma } from "../../database/prisma";
import { getKillerRequestQueueTwitchText } from "../../utils/KillerRequestQueue.util";

export async function getKillerRequestQueues() {
    return getKillerRequestQueueTwitchText();
}
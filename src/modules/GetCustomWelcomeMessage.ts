import { prisma } from "../database/prisma";

export async function getCustomWelcomeMessage(twitchUserId: string) {

    const customWelcomeMessage = await prisma.customWelcomeMessage.findUnique({
        where: { twitchUserId }
    })

    return customWelcomeMessage

}
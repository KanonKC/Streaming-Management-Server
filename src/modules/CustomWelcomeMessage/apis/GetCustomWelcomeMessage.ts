import { CustomWelcomeMessages } from "../../../constants/CustomWelcomeMessage.constant";
import { prisma } from "../../../database/prisma";

const DefaultSoundFilename = "cafe_bell_door.mp3"
const DefaultWelcomeMessage = "kanonkCrazyeyes"

export async function getCustomWelcomeMessage(twitchUserId: string) {

    const customWelcomeMessage = CustomWelcomeMessages.find((item) => item.twitchUserId === twitchUserId)
    const currentStream = await prisma.startStream.findFirstOrThrow({ where: { isActive: true } })
    const viewCount = await prisma.viewerCheckIn.count({ where: { timestamp: {
        gte: currentStream.timestamp
    } } }) + 1

    await prisma.viewerCheckIn.create({
        data: {
            twitchUserId,
            order: viewCount
        }
    })

    if (!customWelcomeMessage) {
        return {
            twitchUserId,
            soundFilePath: DefaultSoundFilename,
            message: DefaultWelcomeMessage,
            soundFullPath: `assets/sounds/welcome-sounds/${DefaultSoundFilename}`,
            order: viewCount
        }
    }

    const { soundFilePath, message } = customWelcomeMessage
    
    return { 
        twitchUserId,
        soundFilePath,
        message: message || DefaultWelcomeMessage,
        soundFullPath: `assets/sounds/welcome-sounds/${soundFilePath || DefaultSoundFilename}`,
        order: viewCount
    }

}
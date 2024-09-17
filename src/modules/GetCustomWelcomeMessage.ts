import { configDotenv } from "dotenv";
import { prisma } from "../database/prisma";

const DefaultSoundFilename = "cafe_bell_door.mp3"
const DefaultWelcomeMessage = "kanonkCrazyeyes"

configDotenv()
const { WELCOME_SOUND_FULL_PATH } = process.env

export async function getCustomWelcomeMessage(twitchUserId: string) {

    const customWelcomeMessage = await prisma.customWelcomeMessage.findUnique({
        where: { twitchUserId }
    })

    if (!customWelcomeMessage) {
        return {
            twitchUserId,
            soundFilePath: DefaultSoundFilename,
            message: DefaultWelcomeMessage,
            soundFullPath: `${WELCOME_SOUND_FULL_PATH}/${DefaultSoundFilename}`
        }
    }

    const { soundFilePath, message } = customWelcomeMessage
    return { 
        twitchUserId,
        soundFilePath,
        message: message || DefaultWelcomeMessage,
        soundFullPath: `${WELCOME_SOUND_FULL_PATH}/${soundFilePath}`
    }

}
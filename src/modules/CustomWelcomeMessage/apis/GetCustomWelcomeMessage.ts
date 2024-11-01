import { CustomWelcomeMessages } from "../../../constants/CustomWelcomeMessage.constant";

const DefaultSoundFilename = "cafe_bell_door.mp3"
const DefaultWelcomeMessage = "kanonkCrazyeyes"

export async function getCustomWelcomeMessage(twitchUserId: string) {

    const customWelcomeMessage = CustomWelcomeMessages.find((item) => item.twitchUserId === twitchUserId)

    if (!customWelcomeMessage) {
        return {
            twitchUserId,
            soundFilePath: DefaultSoundFilename,
            message: DefaultWelcomeMessage,
            soundFullPath: `assets/sounds/welcome-sounds/${DefaultSoundFilename}`
        }
    }

    const { soundFilePath, message } = customWelcomeMessage
    
    return { 
        twitchUserId,
        soundFilePath,
        message: message || DefaultWelcomeMessage,
        soundFullPath: `assets/sounds/welcome-sounds/${soundFilePath}`
    }

}
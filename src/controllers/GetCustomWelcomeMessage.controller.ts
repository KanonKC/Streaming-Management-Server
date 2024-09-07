import { FastifyReply, FastifyRequest } from "fastify";
import { getCustomWelcomeMessage } from "../modules/GetCustomWelcomeMessage";
import { configDotenv } from "dotenv";

configDotenv()
const { WELCOME_SOUND_FULL_PATH } = process.env

export async function getCustomWelcomeMessageController(
    request: FastifyRequest<{
        Params: { twitchUserId: string }
    }>,
    reply: FastifyReply
) {
    const customWelcomeMessage = await getCustomWelcomeMessage(request.params.twitchUserId)
    console.log(customWelcomeMessage)
    if (!customWelcomeMessage || !WELCOME_SOUND_FULL_PATH) {
        return reply.status(200).send({
            found: false
        })
    } else {
        return reply.status(200).send({
            ...customWelcomeMessage,
            found: true,
            soundFullPath: `${WELCOME_SOUND_FULL_PATH}/${customWelcomeMessage.soundFilePath}` 
        })
    }

}
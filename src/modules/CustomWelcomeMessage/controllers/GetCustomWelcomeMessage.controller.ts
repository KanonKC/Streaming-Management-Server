import { FastifyReply, FastifyRequest } from "fastify";
import { configDotenv } from "dotenv";
import { getCustomWelcomeMessage } from "../apis/GetCustomWelcomeMessage";
import { createNewViewerCounter } from "../apis/CreateNewViewerCounter";

configDotenv()
const { TWITCH_BROADCASTER_ID } = process.env

export async function getCustomWelcomeMessageController(
    request: FastifyRequest<{
        Params: { twitchUserId: string }
    }>,
    reply: FastifyReply
) {

    try {
        const { twitchUserId } = request.params

    const ignoredTwitchUserIdList = [
        TWITCH_BROADCASTER_ID,
        "1108286106",
        "52268235"
    ]

    if (ignoredTwitchUserIdList.includes(twitchUserId)) {
        return reply.status(204)
    }

    const customWelcomeMessage = await getCustomWelcomeMessage(twitchUserId)
    return reply.status(200).send(customWelcomeMessage)
    } catch (error) {
        console.error(error)
    }
}

export async function createNewViewerCounterController(
    _: FastifyRequest,
    reply: FastifyReply
) {
    await createNewViewerCounter()
    console.log("New viewer counter created")
    return reply.status(204).send()
}
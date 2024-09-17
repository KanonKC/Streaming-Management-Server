import { FastifyReply, FastifyRequest } from "fastify";
import { getCustomWelcomeMessage } from "../modules/GetCustomWelcomeMessage";

export async function getCustomWelcomeMessageController(
    request: FastifyRequest<{
        Params: { twitchUserId: string }
    }>,
    reply: FastifyReply
) {
    const customWelcomeMessage = await getCustomWelcomeMessage(request.params.twitchUserId)
    return reply.status(200).send({
        ...customWelcomeMessage,
        found: true,
    })
}
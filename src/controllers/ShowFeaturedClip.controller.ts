import { FastifyReply, FastifyRequest } from "fastify"
import { showFeaturedTwitchClip } from "../modules/ShowFeaturedTwitchClip";

type ShowFeaturedClip = FastifyRequest<{
    Querystring: { broadcasterId: string }
}>

export async function showFeaturedTwitchClipController(request: ShowFeaturedClip, reply: FastifyReply) {
    const { broadcasterId } = request.query;
    const response = await showFeaturedTwitchClip(String(broadcasterId))
    return reply.status(200).send(response)
}
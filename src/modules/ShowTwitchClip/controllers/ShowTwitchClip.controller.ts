import { FastifyReply, FastifyRequest } from "fastify"
import { showFeaturedTwitchClip, ShowFeatureTwitchClipOptions } from "../apis/ShowFeaturedTwitchClip";

type ShowFeaturedClip = FastifyRequest<{
    Querystring: { broadcasterId: string }
}>

export async function showFeaturedTwitchClipController(request: ShowFeaturedClip, reply: FastifyReply) {
    const { broadcasterId } = request.query;
    try {
        const response = await showFeaturedTwitchClip(String(broadcasterId), {
            resolution: { width: 1920, height: 1080 }
        })
        return reply.status(200).send(response)
    } catch (error) {
        console.error(error)
    }
    return reply.status(204).send()
}

export async function advancedShowFeaturedTwitchClipController(request: FastifyRequest<{
    Querystring: { broadcasterId: string },
    Body: { options: ShowFeatureTwitchClipOptions }
}>, reply: FastifyReply) {
    const { broadcasterId } = request.query;
    const { options } = request.body;
    const response = await showFeaturedTwitchClip(String(broadcasterId), options)
    return reply.status(200).send(response)
}
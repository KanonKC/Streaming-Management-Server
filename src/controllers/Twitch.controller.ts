import { FastifyReply, FastifyRequest } from "fastify"
import { getUserLoginAccessToken } from "../services/Twitch.service"
import { twitchStore } from "../stores/Twitch.store"

export async function twitchAuthorizationCallbackController(request: FastifyRequest<{
    Querystring: { code: string, state: string }
}>, reply: FastifyReply) {

    const { code } = request.query
    const response = await getUserLoginAccessToken(code)
    const auth = response.data

    await twitchStore.setToken(auth)

    console.log('Twitch authorization successful')
    reply.send('Twitch authorization successful')
}

export async function twitchEventSubscriptionCallbackController(request: FastifyRequest<{
    Querystring: { code: string, state: string }
}>, reply: FastifyReply) {
    console.log('twitchEventSubscriptionCallbackController')
    return reply.send('twitchEventSubscriptionCallbackController')
}
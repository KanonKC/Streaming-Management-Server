import { FastifyReply, FastifyRequest } from "fastify"
import { getUserLoginAccessToken } from "../services/Twitch.service"

export async function twitchAuthorizationCallbackController(request: FastifyRequest<{
    Querystring: { code: string, state: string }
}>, reply: FastifyReply) {
    console.log('Twitch authorization callback')
    const { code } = request.query
    console.log(code)
    const response = await getUserLoginAccessToken(code)
    const auth = response?.data
    console.log(auth)

    // await spotifyStore.setToken(auth)

    console.log('Twitch authorization successful')
    reply.send('Twitch authorization successful')
}
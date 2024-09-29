import { FastifyReply, FastifyRequest } from "fastify"
import { getChannelInfo } from "../services/Twitch.service"
import { changeStreamTitle } from "../modules/ChangeStreamTitle"
import { configDotenv } from "dotenv"
import { post } from "request"
import { getUserLoginAccessToken } from "../services/Spotify.service"

configDotenv()
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PORT  } = process.env 

export async function spotifyAuthorizationCallbackController(request: FastifyRequest<{
    Querystring: { code: string, state: string }
}>, reply: FastifyReply) {

    const { code, state } = request.query

    const result = await getUserLoginAccessToken(code)
    console.log(result.data.access_token)
}
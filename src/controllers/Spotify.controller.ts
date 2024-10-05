import { FastifyReply, FastifyRequest } from "fastify"
import { getChannelInfo } from "../services/Twitch.service"
import { changeStreamTitle } from "../modules/ChangeStreamTitle"
import { configDotenv } from "dotenv"
import { post } from "request"
import { getUserLoginAccessToken } from "../services/Spotify.service"
import { spotifyStore } from "../stores/Spotify.store"
import { addMusicTrackToSpotifyPlayer } from "../modules/AddMusicTrackToSpotifyPlayer"

configDotenv()
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PORT  } = process.env 

export async function spotifyAuthorizationCallbackController(request: FastifyRequest<{
    Querystring: { code: string, state: string }
}>, reply: FastifyReply) {

    const { code } = request.query

    const response = await getUserLoginAccessToken(code)
    const auth = response.data

    const result = await spotifyStore.setToken(auth)
    console.log(result.expires)
    console.log('Spotify authorization successful')
    reply.send('Spotify authorization successful')
}

export async function addMusicTrackToSpotifyPlayerController(request: FastifyRequest<{
    Querystring: { query: string }
}>, reply: FastifyReply) {
    const { query } = request.query
    const response = await addMusicTrackToSpotifyPlayer(query)
    return reply.send(response)
}
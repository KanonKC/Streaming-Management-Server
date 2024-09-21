import { FastifyReply, FastifyRequest } from "fastify"
import { clearBackslash } from "../utils/ClearBackslash.util"
import { showImage } from "../modules/ShowImage"

type ShowImage = FastifyRequest<{
    Querystring: { url: string }
    Headers: {
        imageurl: string
        twitchid: string
        username: string
    }
}>

export async function showImageController(request: ShowImage, reply: FastifyReply) {
    const { imageurl, twitchid, username } = request.headers
    const formatUrl = clearBackslash(String(imageurl))
    const image = await showImage(formatUrl, twitchid, username)
    return reply.send(image)
}
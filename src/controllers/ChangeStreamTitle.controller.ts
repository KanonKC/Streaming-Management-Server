import { FastifyReply, FastifyRequest } from "fastify"
import { getChannelInfo } from "../services/Twitch.service"
import { changeStreamTitle } from "../modules/ChangeStreamTitle"
import { configDotenv } from "dotenv"

configDotenv()
const { TWITCH_BROADCASTER_ID } = process.env 

type ChangeStreamTitle = FastifyRequest<{
    Querystring: { newTitle: string }
}>

export async function changeStreamTitleController(request: ChangeStreamTitle, reply: FastifyReply) {
    
    if (!TWITCH_BROADCASTER_ID) {
        return reply.status(500).send({ message: 'Twitch broadcaster ID is not found' })
    }

    const { newTitle } = request.query
    const channelInfo = await getChannelInfo(TWITCH_BROADCASTER_ID)
    const currentTitle = channelInfo.data.data[0].title
    const newLegitTitle = changeStreamTitle(currentTitle, newTitle)

    return reply.status(200).send({ title: newLegitTitle })
}
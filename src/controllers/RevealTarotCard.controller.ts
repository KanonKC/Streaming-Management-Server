import { FastifyReply, FastifyRequest } from "fastify"
import { getChannelInfo } from "../services/Twitch.service"
import { changeStreamTitle } from "../modules/ChangeStreamTitle"
import { configDotenv } from "dotenv"
import { revealTarotCard } from "../modules/RevealTarotCard/RevealTarotCard"
import { recordTwitchUserRevealTarotCard } from "../modules/RevealTarotCard/RecordTwitchUserRevealTarotCard"

export async function revealTarotCardController(request: FastifyRequest<{
    Querystring: {
        twitchUserId: string
    }
}>, reply: FastifyReply) {
    const response = await revealTarotCard()
    await recordTwitchUserRevealTarotCard({
        twitchUserId: request.query.twitchUserId,
        majorCardId: response.majorCard.id,
        minorCardId: response.minorCard.id,
        data: response
    })
    return reply.status(200).send(response)
}
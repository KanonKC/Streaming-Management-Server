import { FastifyReply, FastifyRequest } from "fastify"
import { getChannelInfo } from "../services/Twitch.service"
import { changeStreamTitle } from "../modules/ChangeStreamTitle"
import { configDotenv } from "dotenv"
import { revealTarotCard } from "../modules/RevealTarotCard"

export async function revealTarotCardController(request: FastifyRequest, reply: FastifyReply) {
    const response = revealTarotCard()
    return reply.status(200).send(response)
}
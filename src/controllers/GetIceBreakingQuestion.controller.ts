import { FastifyReply, FastifyRequest } from "fastify"
import { getOneIceBreakingQuestion } from "../modules/GetOneIceBreakingQuestion"

export async function getIceBreakingQuestionController(_: FastifyRequest, reply: FastifyReply) {
    const question = await getOneIceBreakingQuestion()
    return reply.status(200).send({ question: question })
}
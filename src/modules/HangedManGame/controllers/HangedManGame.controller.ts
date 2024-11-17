import { FastifyReply, FastifyRequest } from "fastify";
import { createHangedManGame } from "../apis/CreateHangedManGame";
import { guessLetterHangedManGame } from "../apis/GuessLetterHangedManGame";
import { guessWordHangedManGame } from "../apis/GuessWordHangedManGame";

export async function createHangedManGameController(
    _: FastifyRequest,
    reply: FastifyReply
) {
    const response = await createHangedManGame(8);
    return reply.status(200).send(response)
}

export async function guessLetterHangedManGameController(
    request: FastifyRequest<{
        Querystring: { letter: string }
    }>,
    reply: FastifyReply
) {
    const { letter } = request.query
    const response = await guessLetterHangedManGame(letter);
    return reply.status(200).send(response)
}

export async function guessWordHangedManGameController(
    request: FastifyRequest<{
        Querystring: { word: string }
    }>,
    reply: FastifyReply
) {
    const { word } = request.query
    const response = await guessWordHangedManGame(word);
    return reply.status(200).send(response)
}
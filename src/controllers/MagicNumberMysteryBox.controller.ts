import { FastifyReply, FastifyRequest } from "fastify"
import { createMagicNumberMysteryBox } from "../modules/MagicNumberMysteryBox/CreateMagicNumberMysteryBox"
import { solveMagicNumberMysteryBox } from "../modules/MagicNumberMysteryBox/SolveMagicNumberMysteryBox"

export async function createMagicNumberMysteryBoxController(request: FastifyRequest<{
    Querystring: {
        maxNumber: string
        minNumber: string
    }
    Params: {
        twitchRewardId: string
    }
}>, reply: FastifyReply) {

    const { twitchRewardId } = request.params
    const { maxNumber, minNumber } = request.query

    const response = await createMagicNumberMysteryBox(twitchRewardId, {
        maxNumber: parseInt(maxNumber),
        minNumber: parseInt(minNumber)
    })

    return reply.send(response)
}

export async function solveMagicNumberMysteryBoxController(request: FastifyRequest<{
    Querystring: {
        guessNumber: string
        twitchUserId: string
        twitchUsername: string
    }
    Params: {
        twitchRewardId: string
    }
}>, reply: FastifyReply) {

    const { twitchRewardId } = request.params
    const { guessNumber, twitchUserId, twitchUsername } = request.query

    try {
        const parseGuess = parseInt(guessNumber)
        if (isNaN(parseGuess)) {
            return reply.send({ code: "INVALID_NUMBER" })
        }
    }
    catch (error) {
        return reply.send({ code: "INVALID_NUMBER" })
    }

    const response = await solveMagicNumberMysteryBox(twitchRewardId, {
        guessNumber: parseInt(guessNumber),
        twitchUserId,
        twitchUsername
    })

    return reply.send(response)
}
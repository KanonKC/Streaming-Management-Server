import { FastifyReply, FastifyRequest } from "fastify"
import { ListAPIResponse } from "../types/Controller.type"
import { TwitchChannelPointRedeemedLog } from "@prisma/client"
import { prisma } from "../database/prisma"
import socket from "../socket-client"

type GetAllTwitchChannelPointRedeemed = FastifyRequest<{
    Querystring: { limit?: string, offset?: string }
}>

export async function getAllTwitchChannelPointRedeemedController(
    request: GetAllTwitchChannelPointRedeemed,
    reply: FastifyReply
) {

    const limit = request.query.limit ? parseInt(request.query.limit) : undefined
    const offset = request.query.offset ? parseInt(request.query.offset) : undefined

    const twitchChannelPointRedeemedLogs = await prisma.twitchChannelPointRedeemedLog.findMany({
        take: limit,
        skip: offset,
        orderBy: { id: 'asc' }
    })

    return reply.status(200).send({
        data: twitchChannelPointRedeemedLogs,
        total: await prisma.twitchChannelPointRedeemedLog.count(),
        limit,
        offset
    })
}
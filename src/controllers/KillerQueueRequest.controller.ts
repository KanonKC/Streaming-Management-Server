import { FastifyReply, FastifyRequest } from "fastify"
import { addKillerRequest, getKillerRequestQueues, markKillerRequestAsDone } from "../modules/KillerQueueRequest"

export async function addKillerRequestController(request: FastifyRequest<{
    Querystring: {
        description: string
    }
    Headers: {
        twitchid: string
        twitchusername: string
    }
}>, reply: FastifyReply) {
    const { description } = request.query
    const { twitchid, twitchusername } = request.headers
    const response = await addKillerRequest(twitchid, String(twitchusername), description)
    return reply.send(response)
}

export async function getKillerRequestQueuesController(request: FastifyRequest, reply: FastifyReply) {
    const queues = await getKillerRequestQueues()
    return reply.send(queues)
}

export async function markKillerRequestAsDoneController(request: FastifyRequest<{
    Params: { index: string }
}>, reply: FastifyReply) {
    const { index } = request.params
    const response = await markKillerRequestAsDone(parseInt(String(index)))
    return reply.send(response)
}
import { FastifyReply, FastifyRequest } from "fastify"
import { getRandomFood } from "../modules/GetRandomFood"

type GetRandomFood = FastifyRequest<{
    Querystring: { filter: string }
}>

export async function getRandomFoodController(request: GetRandomFood, reply: FastifyReply) {
    
    const query = request.query.filter
    const menu = await getRandomFood(query)
    if (!menu) {
        const subMenu = await getRandomFood('')
        reply.send({ menu: subMenu, found: false })
    }

    return reply.status(200).send({ menu, found: true })
}
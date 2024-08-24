import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "../database/prisma"

type RecordTwitchChannelPointRedeemed = FastifyRequest<{
    Querystring: {
        rewardName: string
    }
    Headers: {
        userid: string
        username: string
        rewardid: string
        rewardcost: number
        rewardprompt: string
    }
}>

export async function recordTwitchChannelPointRedeemedController(
  request: RecordTwitchChannelPointRedeemed,
  reply: FastifyReply
) {
    console.log("recordTwitchChannelPointRedeemedController")
    const { 
        userid,
        username,
        rewardid,
        rewardcost,
        rewardprompt
    } = request.headers;

    const { rewardName } = request.query;

    const result = await prisma.twitchChannelPointRedeemedLog.create({
      data: {
        userId: userid,
        username: username,
        rewardId: rewardid,
        rewardName: rewardName,
        rewardCost: Number(rewardcost),
        rewardPrompt: rewardprompt === "" ? null : rewardprompt,
      }
    })

    console.log(result)

    return reply.status(204)
}
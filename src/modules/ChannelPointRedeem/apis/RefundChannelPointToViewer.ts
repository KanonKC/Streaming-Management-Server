import { prisma } from "../../../database/prisma";

export async function refundChannelPointToViewer(twitchUserId: string, point: number) {
    const redemptionList = await prisma.twitchRewardRedemption.findMany({
        where: {
            twitchUserId,
            status: "UNFULFILLED",
        },
        orderBy: {
            cost: "desc"
        }
    })

    const cancelRedemptionList = []
    let currentRefundPoint = 0

    for (const redemption of redemptionList) {
        if (currentRefundPoint + redemption.cost > point) {
            continue;
        }

        currentRefundPoint += redemption.cost
        cancelRedemptionList.push(redemption)
    }

    console.log(cancelRedemptionList)
    console.log(currentRefundPoint)
}
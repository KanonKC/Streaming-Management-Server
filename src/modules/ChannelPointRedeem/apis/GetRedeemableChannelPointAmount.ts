import { prisma } from "../../../database/prisma";

export async function getRedeemableChannelPointAmount(twitchUserId: string) {
	const redemptionList = await prisma.twitchRewardRedemption.findMany({
		where: {
			twitchUserId,
			status: "UNFULFILLED",
		},
		orderBy: {
			cost: "desc",
		},
	});

	let currentRefundPoint = 0;

	for (const redemption of redemptionList) {
		currentRefundPoint += redemption.cost;
	}

	return currentRefundPoint
}

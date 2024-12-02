import { prisma } from "../../../database/prisma";

export async function getRedeemableChannelPointAmountList(
	twitchUserId: string,
	amountList: number[]
) {
	const redemptionList = await prisma.twitchRewardRedemption.findMany({
		where: {
			twitchUserId,
			status: "UNFULFILLED",
		},
		orderBy: {
			cost: "desc",
		},
	});

	const result = [];
	for (const amount of amountList) {
		let currentRedeemPoint = 0;

		for (const redemption of redemptionList) {
			if (currentRedeemPoint + redemption.cost > amount) {
				continue;
			}
			currentRedeemPoint += redemption.cost;
		}

		result.push({
            expectAmount: amount,
            possibleAmount: currentRedeemPoint
        });
	}

	return { amountList: result };
}

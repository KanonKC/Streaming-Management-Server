import { prisma } from "../../../database/prisma";
import { udpateTwitchRedemptionStatus } from "../../../services/Twitch.service";
import { removeCustomPoint } from "../../CustomPoint/apis/RemoveCustomPoint";
import { getRedeemableChannelPointAmount } from "./GetRedeemableChannelPointAmount";

export async function redeemChannelPointFromCustomPoint(
	twitchUserId: string,
	amount: number
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

	const cancelRedemptionList = [];
	let currentRefundPoint = 0;

	for (const redemption of redemptionList) {
		if (currentRefundPoint + redemption.cost > amount) {
			continue;
		}

		currentRefundPoint += redemption.cost;
		cancelRedemptionList.push(redemption);
	}

	const cancelRedemptionTaskList = cancelRedemptionList.map((redemption) =>
		udpateTwitchRedemptionStatus(
			"135783794",
			redemption.rewardId,
			redemption.redemptionId,
			"CANCELED",
			"dnafsrivhw88gj7eltolrsq6794teq",
			"20slcp652ai7x11axnvvxkyuud4pw9"
		)
	);

	try {
		await Promise.all(cancelRedemptionTaskList);
		const customPoint = await removeCustomPoint(twitchUserId, currentRefundPoint);
		const redeemableChannelPoints = await getRedeemableChannelPointAmount(
			twitchUserId
		);
		return {
			redeemedChannelPoints: currentRefundPoint,
            redeemableChannelPoints,
			...customPoint,
		};
	} catch (error) {
		throw new Error("Error during transaction");
	}
}

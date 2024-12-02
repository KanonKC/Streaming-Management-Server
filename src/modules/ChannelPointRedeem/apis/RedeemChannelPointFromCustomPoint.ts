import { prisma } from "../../../database/prisma";
import { updateTwitchRedemptionStatus } from "../../../services/Twitch.service";
import { streamerBotStore } from "../../../stores/StreamerBot.store";
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

    const { clientId, token } = await streamerBotStore.loadToken()

    if (!clientId || !token) {
        throw Error("No Streamerbot OAuth")
    }

	let currentRefundPoint = 0;

	await removeCustomPoint(twitchUserId, 0);

	for (const redemption of redemptionList) {
		if (currentRefundPoint + redemption.cost > amount) {
			continue;
		}

		try {
			await updateTwitchRedemptionStatus(
				"135783794",
				redemption.rewardId,
				redemption.redemptionId,
				"CANCELED",
				clientId,
				token
			);
			await prisma.twitchRewardRedemption.update({
				where: {
					rewardId_redemptionId: {
						rewardId: redemption.rewardId,
						redemptionId: redemption.redemptionId,
					},
				},
				data: {
					status: "CANCELED",
				},
			});
			currentRefundPoint += redemption.cost;
		} catch (error) {
			console.log(error);
		}
	}

	const customPoint = await removeCustomPoint(
		twitchUserId,
		currentRefundPoint
	);
	const redeemableChannelPoints = await getRedeemableChannelPointAmount(
		twitchUserId
	);
	return {
		redeemedChannelPoints: currentRefundPoint,
		redeemableChannelPoints,
		...customPoint,
	};
}

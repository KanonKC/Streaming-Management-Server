import { prisma } from "../../../database/prisma";

export interface CreateTwitchChannelPointRedeemedLogPayload {
	userid: string;
	username: string;
	rewardid: string;
	rewardcost: number;
	rewardName: string;
	rewardprompt: string;
}

export function createTwitchChannelPointRedeemedLog(
	payload: CreateTwitchChannelPointRedeemedLogPayload
) {
	return prisma.twitchChannelPointRedeemedLog.create({
		data: {
			userId: payload.userid,
			username: payload.username,
			rewardId: payload.rewardid,
			rewardName: payload.rewardName,
			rewardCost: Number(payload.rewardcost),
			rewardPrompt:
				payload.rewardprompt === "" ? null : payload.rewardprompt,
		},
	});
}

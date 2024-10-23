import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import socket from "../socket-client";

type RecordTwitchChannelPointRedeemed = FastifyRequest<{
	Querystring: {
		rewardName: string;
		rewardprompt: string;
	};
	Headers: {
		userid: string;
		username: string;
		rewardid: string;
		rewardcost: number;
	};
}>;

export async function recordTwitchChannelPointRedeemedController(
	request: RecordTwitchChannelPointRedeemed,
	reply: FastifyReply
) {
	const { userid, username, rewardid, rewardcost } = request.headers;

	const { rewardName, rewardprompt } = request.query;

	await prisma.twitchChannelPointRedeemedLog.create({
		data: {
			userId: userid,
			username: username,
			rewardId: rewardid,
			rewardName: rewardName,
			rewardCost: Number(rewardcost),
			rewardPrompt: rewardprompt === "" ? null : rewardprompt,
		},
	});

	socket.emit("reloadTwitchChannelPointRedeemedLog");

	return reply.status(204);
}

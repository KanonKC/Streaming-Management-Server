import { FastifyReply, FastifyRequest } from "fastify";
import socket from "../../../socket-client";
import { createTwitchChannelPointRedeemedLog } from "../apis/CreateTwitchChannelPointRedeemedLog";
import { getAllTwitchChannelPointRedeemedLogs } from "../apis/GetAllTwitchChannelPointRedeemedLogs";

export async function getAllTwitchChannelPointRedeemedLogsController(
	request: FastifyRequest<{
		Querystring: { limit?: string; offset?: string };
	}>,
	reply: FastifyReply
) {
	const limit = request.query.limit
		? parseInt(request.query.limit)
		: undefined;
	const offset = request.query.offset
		? parseInt(request.query.offset)
		: undefined;

	const twitchChannelPointRedeemedLogs =
		await getAllTwitchChannelPointRedeemedLogs(limit, offset);

	return reply.status(200).send(twitchChannelPointRedeemedLogs);
}

export async function createTwitchChannelPointRedeemedLogController(
	request: FastifyRequest<{
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
	}>,
	reply: FastifyReply
) {
	const { userid, username, rewardid, rewardcost } = request.headers;

	const { rewardName, rewardprompt } = request.query;

	await createTwitchChannelPointRedeemedLog({
		userid,
		username,
		rewardid,
		rewardcost,
		rewardName,
		rewardprompt,
	});

	socket.emit("reloadTwitchChannelPointRedeemedLog");

	return reply.status(204);
}

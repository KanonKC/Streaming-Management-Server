import { FastifyReply, FastifyRequest } from "fastify";
import { getLeaderboards, LeaderboardsType } from "../apis/GetLeaderboards";

export async function getLeaderboardsController(
	request: FastifyRequest<{
		Params: {
			leaderboardsType: LeaderboardsType;
			twitchUserId: string;
		};
		Querystring: {
			startPeroid: string;
			endPeroid: string;
			offset: string;
			limit: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const { leaderboardsType, twitchUserId } = request.params;
		const { startPeroid, endPeroid, offset, limit } = request.query;
		const response = await getLeaderboards(leaderboardsType, twitchUserId, {
			startPeroid: parseInt(startPeroid) ?? undefined,
			endPeroid: parseInt(endPeroid) ?? undefined,
			offset: parseInt(offset) ?? undefined,
			limit: parseInt(limit) ?? undefined,
		});
		return reply.status(200).send(response);
	} catch (error) {
		console.log(error);
	}
}

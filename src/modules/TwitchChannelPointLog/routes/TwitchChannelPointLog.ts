import { FastifyInstance } from "fastify";
import { createTwitchChannelPointRedeemedLogController, getAllTwitchChannelPointRedeemedLogsController } from "../controllers/TwitchChannelPointLog";

export async function createTwitchChannelPointLog(server: FastifyInstance) {
	server.get(
		"/twitch/channel-point-redeemed",
		getAllTwitchChannelPointRedeemedLogsController
	);
	server.get(
		"/twitch/channel-point-redeemed/create",
		createTwitchChannelPointRedeemedLogController
	);
}

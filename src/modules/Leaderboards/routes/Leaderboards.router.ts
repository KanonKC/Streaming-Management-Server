import { FastifyInstance } from "fastify";
import { getLeaderboardsController } from "../controllers/Leaderboards.controller";

export function createLeaderboardsRoutes(server: FastifyInstance) {
	server.get("/leaderboards/:leaderboardsType/:twitchUserId", getLeaderboardsController);
}

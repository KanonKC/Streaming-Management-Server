import { FastifyInstance } from "fastify";
import { getCustomPointController } from "../controllers/CustomPoint.controller";

export function createCustomPointRoutes(server: FastifyInstance) {
	server.get(
		"/custom-point/:twitchUserId",
		getCustomPointController
	);
}

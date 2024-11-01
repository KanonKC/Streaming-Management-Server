import { FastifyInstance } from "fastify";
import { getCustomWelcomeMessageController } from "../controllers/GetCustomWelcomeMessage.controller";

export function createCustomWelcomeMessageRoutes(server: FastifyInstance) {
	server.get(
		"/welcome-message/:twitchUserId",
		getCustomWelcomeMessageController
	);
}

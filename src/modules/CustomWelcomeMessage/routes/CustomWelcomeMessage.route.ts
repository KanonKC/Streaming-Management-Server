import { FastifyInstance } from "fastify";
import { createNewViewerCounterController, getCustomWelcomeMessageController } from "../controllers/GetCustomWelcomeMessage.controller";

export function createCustomWelcomeMessageRoutes(server: FastifyInstance) {
	server.get(
		"/welcome-message/:twitchUserId",
		getCustomWelcomeMessageController
	);
	server.get(
		"/welcome-message/new-counter",
		createNewViewerCounterController
	);
}

import { FastifyInstance } from "fastify";
import {
	getTwitchUserTarotCardCollectionsController,
	getTwitchUserTarotCardDetailController,
	revealTarotCardController,
} from "../controllers/TarotCard.controller";

export function createTarotCardRoutes(server: FastifyInstance) {
	server.get("/tarot", revealTarotCardController);
	server.get(
		"/tarot/:twitchUserId",
		getTwitchUserTarotCardCollectionsController
	);
	server.get(
		"/tarot/:twitchUserId/:cardNumber",
		getTwitchUserTarotCardDetailController
	);
}

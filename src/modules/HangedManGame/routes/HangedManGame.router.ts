import { FastifyInstance } from "fastify";
import { createHangedManGameController, guessLetterHangedManGameController, guessWordHangedManGameController } from "../controllers/HangedManGame.controller";

export function createHangedManGameRoutes(server: FastifyInstance) {
	server.get("/hanged-man-game/create", createHangedManGameController);
	server.get("/hanged-man-game/guess-letter", guessLetterHangedManGameController);
	server.get("/hanged-man-game/guess-word", guessWordHangedManGameController);
}

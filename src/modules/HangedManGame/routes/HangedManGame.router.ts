import { FastifyInstance } from "fastify";
import { createHangedManGameController, getHangedManGameLeaderboardsController, guessLetterHangedManGameController, guessWordHangedManGameController } from "../controllers/HangedManGame.controller";

export function createHangedManGameRoutes(server: FastifyInstance) {
	server.get("/hanged-man-game/create", createHangedManGameController);
	server.get("/hanged-man-game/guess-letter", guessLetterHangedManGameController);
	server.get("/hanged-man-game/guess-word", guessWordHangedManGameController);
	server.get("/hanged-man-game/leaderboard", getHangedManGameLeaderboardsController);
}
